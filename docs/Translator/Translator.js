import fs from 'fs/promises';
import path from 'path';

const SOURCE_DIR = '../src';

const TARGET_LANGUAGES = [
  'en',        // 英语
  'ja',        // 日语
];

const API_BASE_URL = 'https://api.mokita.fun/v1';
const MODEL_NAME = 'gemini-1.5-flash';
const API_KEYS = [
  'sk-K26PYCgvlW2pI8mJKwYNVw4YXRLpYLGq0yeBStXDFlMzr89u',
  // 添加更多 API Key
];

function getRandomApiKey() {
  const randomIndex = Math.floor(Math.random() * API_KEYS.length);
  const selectedKey = API_KEYS[randomIndex];
  console.log(`Using API Key #${randomIndex + 1}`);
  return selectedKey;
}

function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontMatterRegex);

  if (match) {
    const frontMatterContent = match[1];
    const frontMatterData = {};
    const lines = frontMatterContent.split('\n');
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
        frontMatterData[key] = value;
      }
    }
    return {
      frontMatter: match[0],
      content: content.substring(match[0].length),
      frontMatterData: frontMatterData
    };
  }
  return {
    frontMatter: '',
    content: content,
    frontMatterData: {}
  };
}

function rebuildFrontMatter(frontMatterData) {
  if (Object.keys(frontMatterData).length === 0) {
    return '';
  }
  let result = '---\n';
  for (const [key, value] of Object.entries(frontMatterData)) {
    // 确保值不为空，并且正确转义 YAML 值
    const safeValue = value ? String(value).replace(/"/g, '\\"') : '';
    result += `${key}: "${safeValue}"\n`;
  }
  result += '---\n';
  return result;
}

async function translateFrontMatter(frontMatterData, targetLang) {
  const translatedData = { ...frontMatterData };
  for (const field of ['title', 'description', 'text']) {
    if (translatedData[field]) {
      console.log(`Translating ${field}: ${translatedData[field]}`);
      const translated = await translateWithOpenAI(translatedData[field], targetLang);
      translatedData[field] = translated.trim();
    }
  }
  return translatedData;
}

// 重试配置
const MAX_RETRIES = 3; // 最大重试次数
const RETRY_DELAY = 1000; // 重试延迟（毫秒）

/**
 * 延迟函数
 * @param {number} ms - 延迟毫秒数
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateWithOpenAI(text, targetLang) {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Translation attempt ${attempt}/${MAX_RETRIES}`);

      const prompt = `Please translate the following Markdown content to ${targetLang}.
IMPORTANT RULES:
1. Keep all HTML tags exactly as they are, only translate the text content inside tags
2. Do NOT translate any code blocks, code spans, or technical terms
3. Preserve all Markdown formatting (headers, lists, links, etc.)
4. Return ONLY the translated content, no explanations or additional text
5. If there are HTML attributes, keep them unchanged

Content to translate:
${text}`;

      const body = {
        model: MODEL_NAME,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000,
        temperature: 0.3,
      };

      const res = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getRandomApiKey()}`,
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      const translatedText = data.choices?.[0]?.message?.content?.trim() || '';

      // 检查翻译结果是否为空或无效
      if (!translatedText || translatedText.length === 0) {
        throw new Error('Empty translation result');
      }

      console.log(`✅ Translation successful on attempt ${attempt}`);
      return translatedText;

    } catch (error) {
      lastError = error;
      console.error(`❌ Translation attempt ${attempt} failed: ${error.message}`);

      // 如果不是最后一次尝试，则等待后重试
      if (attempt < MAX_RETRIES) {
        console.log(`⏳ Retrying in ${RETRY_DELAY}ms...`);
        await delay(RETRY_DELAY);
      }
    }
  }

  // 所有重试都失败了
  throw new Error(`Translation failed after ${MAX_RETRIES} attempts. Last error: ${lastError.message}`);
}

/**
 * 处理单个文件的多语言翻译
 * @param {string} filePath - 源文件路径
 */
async function processFileForAllLanguages(filePath) {
  console.log(`\n📄 Processing file: ${filePath}`);

  for (const targetLang of TARGET_LANGUAGES) {
    try {
      // 检查目标文件是否已存在
      const exists = await targetFileExists(filePath, targetLang);
      if (exists) {
        console.log(`⏭️  Skipping ${targetLang}: File already exists`);
        continue;
      }

      console.log(`🌐 Translating to ${targetLang}...`);
      await translateAndSaveFile(filePath, targetLang);

    } catch (error) {
      console.error(`❌ Error translating ${filePath} to ${targetLang}:`, error.message);
      // 继续处理下一个语言，不中断整个流程
    }
  }
}

/**
 * 遍历目录并翻译其中的 Markdown 文件
 * @param {string} dir - 要遍历的当前目录
 */
async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (path.extname(entry.name).toLowerCase() === '.md') {
        // 只处理 .md 文件，跳过 config.ts 等配置文件
        await processFileForAllLanguages(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}

/**
 * 翻译单个文件并保存到指定语言目录
 * @param {string} filePath - 文件的完整路径
 * @param {string} targetLang - 目标语言代码
 */
async function translateAndSaveFile(filePath, targetLang) {
  const content = await fs.readFile(filePath, 'utf8');
  if (!content.trim()) {
    console.log(`Skipping empty file: ${filePath}`);
    return;
  }

  const { frontMatter, content: mainContent, frontMatterData } = parseFrontMatter(content);
  if (!mainContent.trim() && Object.keys(frontMatterData).length === 0) {
    console.log(`Skipping empty file: ${filePath}`);
    return;
  }

  let translatedFrontMatter = '';
  let translatedContent = '';

  // 翻译 Front Matter 中的 title、description 和 text
  if (Object.keys(frontMatterData).length > 0) {
    const translatedData = await translateFrontMatter(frontMatterData, targetLang);
    translatedFrontMatter = rebuildFrontMatter(translatedData);
  }

  // 翻译主要内容
  if (mainContent.trim()) {
    translatedContent = await translateWithOpenAI(mainContent, targetLang);
  }

  // 组合最终内容
  const finalContent = translatedFrontMatter + translatedContent;

  // 生成输出路径
  const relativePath = path.relative(SOURCE_DIR, filePath);
  const outputPath = path.join('.', targetLang, relativePath);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, finalContent, 'utf8');
  console.log(`✅ Saved: ${outputPath}`);
}

/**
 * 检查目标文件是否已存在
 * @param {string} sourceFilePath - 源文件路径
 * @param {string} targetLang - 目标语言
 * @returns {Promise<boolean>} - 文件是否存在
 */
async function targetFileExists(sourceFilePath, targetLang) {
  const relativePath = path.relative(SOURCE_DIR, sourceFilePath);
  const outputPath = path.join('.', targetLang, relativePath);

  try {
    await fs.access(outputPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log(`🚀 Starting multi-language translation of '${SOURCE_DIR}'...`);
  console.log(`📋 Target languages: ${TARGET_LANGUAGES.join(', ')}`);
  console.log(`📂 Checking existing files and translating only missing ones...\n`);

  try {
    // 检查源目录是否存在
    await fs.access(SOURCE_DIR);
  } catch (error) {
    console.error(`❌ Error: Source directory '${SOURCE_DIR}' not found.`);
    return;
  }

  const startTime = Date.now();
  await processDirectory(SOURCE_DIR);
  const endTime = Date.now();

  console.log(`\n🎉 Translation process completed in ${((endTime - startTime) / 1000).toFixed(2)} seconds.`);
}

main().catch(console.error);
