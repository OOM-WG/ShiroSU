<script setup lang="ts">
import { ref, computed } from "vue"

// 定义组件的 props，用于从外部接收配置
const props = defineProps({
  // 分享按钮的文本
  shareText: {
    type: String,
    default: "分享链接"
  },
  // 复制成功后的文本
  copiedText: {
    type: String,
    default: "已复制!"
  },
  // 分享链接是否包含查询参数 (e.g., ?foo=bar)
  includeQuery: {
    type: Boolean,
    default: false
  },
  // 分享链接是否包含 hash (e.g., #section-1)
  includeHash: {
    type: Boolean,
    default: false
  },
  // "复制成功"状态的持续时间（毫秒）
  copiedTimeout: {
    type: Number,
    default: 2000
  },
}

defineOptions({ name: "ArticleShare" })

// --- 内部状态和逻辑 ---

// 响应式状态，用于追踪是否已复制
const copied = ref(false)

// 检查是否在客户端环境
const isClient =
  typeof window !== "undefined" && typeof document !== "undefined"

// 计算要复制的分享链接
// 注意: 此组件依赖于浏览器环境的 `location` 对象
const shareLink = computed(() => {
  // 确保在浏览器环境中运行
  if (!isClient) return ""

  const { origin, pathname, search, hash } = window.location
  const finalSearch = props.includeQuery ? search : ""
  const finalHash = props.includeHash ? hash : ""
  return `${origin}${pathname}${finalSearch}${finalHash}`
})

// 手动实现的剪贴板复制功能
async function copyToClipboard() {
  if (copied.value || !isClient) return // 防止重复点击

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareLink.value)
    } else {
      // 降级方案：兼容不支持现代剪贴板API的浏览器
      const input = document.createElement("input")
      input.setAttribute("readonly", "readonly")
      input.setAttribute("value", shareLink.value)
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
    }

    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, props.copiedTimeout)
  } catch (error) {
    console.error("复制链接失败:", error)
    // 可以在这里添加用户友好的错误提示
  }
}

// 内联的 SVG 图标
const shareIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
`

const copiedIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
`
</script>

<template>
  <div class="article-share">
    <button
      :class="['article-share__button', { copied: copied }]"
      :aria-label="copied ? props.copiedText : props.shareText"
      aria-live="polite"
      @click="copyToClipboard">
      <div v-if="!copied" class="content-wrapper">
        <span class="icon" v-html="shareIconSvg"></span>
        {{ props.shareText }}
      </div>

      <div v-else class="content-wrapper">
        <span class="icon" v-html="copiedIconSvg"></span>
        {{ props.copiedText }}
      </div>
    </button>
  </div>
</template>

<style scoped>
/* 为了实现独立性，已将之前的 SCSS 转换为原生 CSS。
  这里依然使用 CSS 变量（如 --vp-c-bg-alt），
  假设你的项目环境（如 VitePress）会提供这些变量。
*/
.article-share {
  padding: 14px 0;
}

.article-share__button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  z-index: 1;
  transition: all 0.4s var(--ease-out-cubic, cubic-bezier(0.33, 1, 0.68, 1));
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 7px 14px;
  width: 100%;
  overflow: hidden;
  color: var(--vp-c-text-1, #333); /* 增加了备用颜色 */
  background-color: var(--vp-c-bg-alt, #f6f6f7);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  will-change: transform, box-shadow;
}

.article-share__button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  z-index: -1;
  transition: left 0.6s ease;
  background-color: var(--vp-c-brand-soft, #ddf4ff);
  width: 100%;
  height: 100%;
}

.article-share__button:hover {
  transform: translateY(-1px);
  border-color: var(--vp-c-brand-soft, #ddf4ff);
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.article-share__button:active {
  transform: scale(0.9);
}

.article-share__button.copied {
  color: var(--vp-c-brand-1, #007acc); /* 增加了备用颜色 */
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.article-share__button.copied::before {
  left: 0;
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
}
</style>
