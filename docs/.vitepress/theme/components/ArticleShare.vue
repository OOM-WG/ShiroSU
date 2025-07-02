<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useData, useRouter, withBase } from "vitepress"

// 定义组件 props，使用 TypeScript 接口来提高类型安全性
interface Props {
  /** 分享按钮显示的文本 */
  shareText?: string
  /** 复制成功后显示的文本 */
  copiedText?: string
  /** 是否包含 URL 查询参数 */
  includeQuery?: boolean
  /** 是否包含 URL 锚点 */
  includeHash?: boolean
  /** 复制成功提示的显示时长（毫秒） */
  copiedTimeout?: number
}

const props = withDefaults(defineProps<Props>(), {
  shareText: "分享链接",
  copiedText: "已复制!",
  includeQuery: false,
  includeHash: false,
  copiedTimeout: 2000,
})

// 使用 VitePress 官方 Runtime API
const { page, site, isDark } = useData()
const router = useRouter()

// 响应式状态
const copied = ref(false)
const isClient = ref(false)

// 计算属性：根据当前页面信息生成分享链接
const shareLink = computed(() => {
  if (!isClient.value) return ""

  // 使用 VitePress 官方 API 获取页面信息
  const baseUrl = site.value.base || "/"
  const currentPath = page.value.relativePath.replace(/\.md$/, ".html")

  // 构建完整的 URL
  let url = ""
  if (typeof window !== "undefined") {
    url = window.location.origin + withBase(currentPath)

    // 根据配置添加查询参数
    if (
      props.includeQuery &&
      router.route.query &&
      Object.keys(router.route.query).length > 0
    ) {
      const queryString = Object.entries(router.route.query)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        )
        .join("&")
      url += `?${queryString}`
    }

    // 根据配置添加锚点
    if (props.includeHash && router.route.hash) {
      url += router.route.hash
    }
  }

  return url
})

// 计算属性：动态样式，支持暗色模式
const buttonClass = computed(() => [
  "article-share__button",
  {
    copied: copied.value,
    dark: isDark.value,
  },
])

// 复制到剪贴板功能，使用现代浏览器 API
async function copyToClipboard(): Promise<void> {
  if (!shareLink.value || copied.value) return

  try {
    // 优先使用现代 Clipboard API
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareLink.value)
    } else {
      // 降级到传统方法
      await fallbackCopyTextToClipboard(shareLink.value)
    }

    // 设置复制成功状态
    copied.value = true

    // 定时器重置状态
    setTimeout(() => {
      copied.value = false
    }, props.copiedTimeout)
  } catch (error) {
    console.error("复制链接失败:", error)
    // 可以在这里添加错误提示
  }
}

// 降级复制方法
function fallbackCopyTextToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"

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

// 生命周期钩子
onMounted(() => {
  isClient.value = true
})

onUnmounted(() => {
  // 清理定时器
  if (copied.value) {
    copied.value = false
  }
})
</script>

<template>
  <ClientOnly>
    <Transition name="fade" mode="out-in" appear>
      <div class="article-share">
        <button
          :key="copied ? 'copied' : 'share'"
          :class="buttonClass"
          :aria-label="copied ? copiedText : shareText"
          :title="shareLink"
          aria-live="polite"
          @click="copyToClipboard"
          :disabled="!shareLink">
          <div class="content-wrapper">
            <span class="icon" :class="{ 'icon--success': copied }">
              <!-- 分享图标 -->
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
                stroke-linejoin="round"
                class="share-icon">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16,6 12,2 8,6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>

              <!-- 成功图标 -->
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
                stroke-linejoin="round"
                class="success-icon">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>

            <span class="text">
              {{ copied ? copiedText : shareText }}
            </span>
          </div>
        </button>
      </div>
    </Transition>
  </ClientOnly>
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
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 16px;
  width: 100%;
  min-height: 40px;
  overflow: hidden;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  will-change: transform, box-shadow, background-color;
}

.article-share__button:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.article-share__button:active:not(:disabled) {
  transform: translateY(0);
  transition-duration: 0.1s;
}

.article-share__button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

.article-share__button.copied {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.article-share__button.dark {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.2);
}

.article-share__button.dark:hover:not(:disabled) {
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.4),
    0 2px 4px rgba(0, 0, 0, 0.3);
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.icon--success {
  animation: success-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.text {
  font-weight: 500;
}

.share-icon,
.success-icon {
  transition: all 0.2s ease;
}

.success-icon {
  color: var(--vp-c-brand-1);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  .icon,
  .share-icon,
  .success-icon {
    transition: none;
  }

  .icon--success {
    animation: none;
  }
}
</style>
