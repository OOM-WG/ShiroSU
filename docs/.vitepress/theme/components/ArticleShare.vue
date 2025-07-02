<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useData, withBase } from "vitepress"

// 定义组件 props
interface Props {
  /** 分享按钮显示的文本 */
  shareText?: string
  /** 复制成功后显示的文本 */
  copiedText?: string
  /** 复制成功提示的显示时长（毫秒） */
  copiedTimeout?: number
}

const props = withDefaults(defineProps<Props>(), {
  shareText: "分享链接",
  copiedText: "已复制!",
  copiedTimeout: 2000,
})

// 使用 VitePress 官方 Runtime API
const { page, site, isDark } = useData()

// 响应式状态
const copied = ref(false)
const mounted = ref(false)
const shareUrl = ref("")

// onMounted 现在只负责标记组件已挂载到客户端
onMounted(() => {
  mounted.value = true
})

// 使用 watch 响应式地处理页面路径变化，确保数据就绪
watch(
  () => page.value.path, // 侦听 page.path 的变化
  (newPath) => {
    // 确保在客户端环境并且 newPath 有效时才执行
    if (typeof window !== "undefined" && newPath) {
      const pathWithBase = withBase(newPath)
      shareUrl.value = `${window.location.origin}${pathWithBase}`
    }
  },
  { immediate: true }, // 立即执行一次以处理初始加载
)

// 计算属性：动态样式类
const buttonClass = computed(() => ({
  "article-share__button": true,
  "article-share__button--copied": copied.value,
  "article-share__button--dark": isDark.value,
}))

// 复制到剪贴板功能
async function copyToClipboard(): Promise<void> {
  if (!shareUrl.value || copied.value || !mounted.value) return

  try {
    // 使用现代 Clipboard API
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl.value)
    } else {
      // 降级方案
      await fallbackCopyTextToClipboard(shareUrl.value)
    }

    // 设置复制成功状态
    copied.value = true

    // 定时器重置状态
    setTimeout(() => {
      copied.value = false
    }, props.copiedTimeout)
  } catch (error) {
    console.error("复制链接失败:", error)
  }
}

// 降级复制方法
function fallbackCopyTextToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.cssText =
      "position:fixed;left:-9999px;top:-9999px;opacity:0;"

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        resolve()
      } else {
        reject(new Error("复制命令执行失败"))
      }
    } catch (error) {
      document.body.removeChild(textArea)
      reject(error)
    }
  })
}
</script>

<template>
  <div v-if="mounted" class="article-share">
    <button
      :class="buttonClass"
      :aria-label="copied ? copiedText : shareText"
      :title="shareUrl"
      aria-live="polite"
      @click="copyToClipboard"
      :disabled="!shareUrl">
      <div class="article-share__content">
        <span class="article-share__icon" :class="{ success: copied }">
          <svg
            v-if="!copied"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>

        <span class="article-share__text">
          {{ copied ? copiedText : shareText }}
        </span>
      </div>
    </button>
  </div>
</template>

<style scoped>
.article-share {
  padding: 14px 0;
  user-select: none;
}

.article-share__button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  transition: all 0.25s ease;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 16px;
  width: 100%;
  min-height: 40px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.article-share__button:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.article-share__button:active:not(:disabled) {
  transform: translateY(0);
}

.article-share__button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.article-share__button--copied {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.article-share__button--dark {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.article-share__button--dark:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.article-share__content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.article-share__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.article-share__icon.success {
  animation: success-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.article-share__text {
  font-weight: 500;
}

/* 动画效果 */
@keyframes success-bounce {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-share {
    padding: 12px 0;
  }

  .article-share__button {
    font-size: 13px;
    padding: 6px 12px;
    min-height: 36px;
  }
}

/* 无障碍支持 */
.article-share__button:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

/* 减少动画偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .article-share__button,
  .article-share__icon {
    transition: none;
  }

  .article-share__icon.success {
    animation: none;
  }
}
</style>