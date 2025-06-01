#!/usr/bin/env node

/**
 * 开发环境检查脚本 - SSU_Docs 项目
 * 检查开发环境配置和依赖状态
 */

import {execSync} from 'child_process';
import {existsSync, readFileSync} from 'fs';
import {resolve} from 'path';

const projectRoot = process.cwd();

// 颜色输出工具
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
};

function colorLog(color, message) {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function getVersion(command) {
    try {
        return execSync(command, {encoding: 'utf8'}).trim();
    } catch (error) {
        return null;
    }
}

function checkFile(filePath, description) {
    const fullPath = resolve(projectRoot, filePath);
    const exists = existsSync(fullPath);
    const status = exists ? '✅' : '❌';
    colorLog(exists ? 'green' : 'red', `  ${status} ${description}: ${filePath}`);
    return exists;
}

function checkCommand(command, description, versionCommand = null) {
    try {
        execSync(`${command} --version`, {stdio: 'ignore'});
        const version = versionCommand ? getVersion(versionCommand) : getVersion(`${command} --version`);
        colorLog('green', `  ✅ ${description}: ${version || '已安装'}`);
        return true;
    } catch (error) {
        colorLog('red', `  ❌ ${description}: 未安装`);
        return false;
    }
}

function checkNodeVersion() {
    const nodeVersion = getVersion('node --version');
    const npmVersion = getVersion('npm --version');

    colorLog('blue', '\n🔧 Node.js 环境检查:');

    if (nodeVersion) {
        const major = parseInt(nodeVersion.replace('v', '').split('.')[0]);
        const status = major >= 18 ? '✅' : '⚠️';
        const message = major >= 18 ? '版本兼容' : '建议升级到 18+';
        colorLog(major >= 18 ? 'green' : 'yellow', `  ${status} Node.js: ${nodeVersion} (${message})`);
    }

    if (npmVersion) {
        colorLog('green', `  ✅ npm: ${npmVersion}`);
    }
}

function checkPackageManager() {
    colorLog('blue', '\n📦 包管理器检查:');

    const managers = [
        {cmd: 'pnpm', desc: 'pnpm (推荐)'},
        {cmd: 'yarn', desc: 'Yarn'},
        {cmd: 'npm', desc: 'npm'}
    ];

    managers.forEach(manager => {
        checkCommand(manager.cmd, manager.desc);
    });

    // 检查锁文件
    colorLog('white', '\n  锁文件状态:');
    checkFile('pnpm-lock.yaml', 'pnpm 锁文件');
    checkFile('package-lock.json', 'npm 锁文件');
    checkFile('yarn.lock', 'yarn 锁文件');
}

function checkProjectFiles() {
    colorLog('blue', '\n📋 项目文件检查:');

    const requiredFiles = [
        {path: 'package.json', desc: '项目配置文件'},
        {path: '.vitepress/config.ts', desc: 'VitePress 配置'},
        {path: '.vitepress/theme/index.ts', desc: '主题配置'},
        {path: 'src/index.md', desc: '首页文件'},
        {path: 'tsconfig.json', desc: 'TypeScript 配置'}
    ];

    requiredFiles.forEach(file => {
        checkFile(file.path, file.desc);
    });
}

function checkDependencies() {
    colorLog('blue', '\n📦 依赖状态检查:');

    try {
        const packageJson = JSON.parse(readFileSync(resolve(projectRoot, 'package.json'), 'utf8'));
        const totalDeps = Object.keys(packageJson.dependencies || {}).length;
        const totalDevDeps = Object.keys(packageJson.devDependencies || {}).length;

        colorLog('white', `  📊 生产依赖: ${totalDeps} 个`);
        colorLog('white', `  📊 开发依赖: ${totalDevDeps} 个`);

        // 检查 node_modules
        const nodeModulesExists = existsSync(resolve(projectRoot, 'node_modules'));
        if (nodeModulesExists) {
            colorLog('green', '  ✅ node_modules 已安装');

            // 检查关键依赖
            const keyDeps = ['vitepress', 'vue', '@nolebase/vitepress-plugin-git-changelog'];
            colorLog('white', '\n  关键依赖检查:');
            keyDeps.forEach(dep => {
                const depPath = resolve(projectRoot, 'node_modules', dep);
                const exists = existsSync(depPath);
                const status = exists ? '✅' : '❌';
                colorLog(exists ? 'green' : 'red', `    ${status} ${dep}`);
            });
        } else {
            colorLog('red', '  ❌ node_modules 未安装');
            colorLog('yellow', '      运行: pnpm install');
        }
    } catch (error) {
        colorLog('red', '  ❌ 无法读取 package.json');
    }
}

function checkBuildStatus() {
    colorLog('blue', '\n🏗️  构建状态检查:');

    const distExists = existsSync(resolve(projectRoot, 'dist'));
    const cacheExists = existsSync(resolve(projectRoot, '.vitepress/.temp'));

    colorLog(distExists ? 'green' : 'yellow', `  ${distExists ? '✅' : '⚠️'} 构建产物: ${distExists ? '存在' : '不存在'}`);
    colorLog(cacheExists ? 'yellow' : 'green', `  ${cacheExists ? '⚠️' : '✅'} 缓存文件: ${cacheExists ? '存在 (建议清理)' : '不存在'}`);
}

function checkGitStatus() {
    colorLog('blue', '\n🔄 Git 状态检查:');

    try {
        const gitExists = existsSync(resolve(projectRoot, '.git'));
        if (!gitExists) {
            colorLog('red', '  ❌ 不是 Git 仓库');
            return;
        }

        colorLog('green', '  ✅ Git 仓库已初始化');

        const status = getVersion('git status --porcelain');
        const hasChanges = status && status.length > 0;
        colorLog(hasChanges ? 'yellow' : 'green', `  ${hasChanges ? '⚠️' : '✅'} 工作区状态: ${hasChanges ? '有未提交的更改' : '干净'}`);

        const branch = getVersion('git rev-parse --abbrev-ref HEAD');
        if (branch) {
            colorLog('white', `  📍 当前分支: ${branch}`);
        }
    } catch (error) {
        colorLog('red', '  ❌ Git 检查失败');
    }
}

function generateReport() {
    colorLog('blue', '\n📊 环境报告生成:');

    const report = {
        timestamp: new Date().toISOString(),
        node: getVersion('node --version'),
        npm: getVersion('npm --version'),
        pnpm: getVersion('pnpm --version'),
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd()
    };

    colorLog('white', '  环境信息:');
    Object.entries(report).forEach(([key, value]) => {
        colorLog('white', `    ${key}: ${value || 'N/A'}`);
    });
}

function showRecommendations() {
    colorLog('cyan', '\n💡 建议操作:');

    // 检查常见问题并给出建议
    const nodeModulesExists = existsSync(resolve(projectRoot, 'node_modules'));
    const distExists = existsSync(resolve(projectRoot, 'dist'));
    const cacheExists = existsSync(resolve(projectRoot, '.vitepress/.temp'));

    if (!nodeModulesExists) {
        colorLog('yellow', '  📦 运行 "pnpm install" 安装依赖');
    }

    if (cacheExists) {
        colorLog('yellow', '  🧹 运行 "pnpm clean:cache" 清理缓存');
    }

    if (!distExists) {
        colorLog('yellow', '  🏗️  运行 "pnpm build" 构建项目');
    }

    colorLog('green', '  🚀 运行 "pnpm dev" 启动开发服务器');
    colorLog('green', '  📖 查看 "scripts-guide.md" 了解更多脚本命令');
}

async function main() {
    colorLog('cyan', '🔍 SSU_Docs 开发环境检查工具');
    colorLog('white', `📍 项目路径: ${projectRoot}\n`);

    // 执行各项检查
    checkNodeVersion();
    checkPackageManager();
    checkProjectFiles();
    checkDependencies();
    checkBuildStatus();
    checkGitStatus();
    generateReport();
    showRecommendations();

    colorLog('white', '\n✨ 环境检查完成!');
}

// 错误处理
process.on('uncaughtException', (error) => {
    colorLog('red', `❌ 未捕获的异常: ${error.message}`);
    process.exit(1);
});

main().catch((error) => {
    colorLog('red', `❌ 检查失败: ${error.message}`);
    process.exit(1);
});
