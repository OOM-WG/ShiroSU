<script setup lang="ts">
import { ref, onMounted } from "vue"

const props = defineProps({
  shareText: {
    type: String,
    default: "分享链接",
  },
  copiedText: {
    type: String,
    default: "已复制!",
  },
  includeQuery: {
    type: Boolean,
    default: false,
  },
  includeHash: {
    type: Boolean,
    default: false,
  },
  copiedTimeout: {
    type: Number,
    default: 2000,
  },
})

const copied = ref(false)
const shareLink = ref("") // 初始为空字符串

// onMounted 确保只在客户端执行，避免 SSR 错误
onMounted(() => {
  if (typeof window !== "undefined") {
    const { origin, pathname, search, hash } = window.location
    const finalSearch = props.includeQuery ? search : ""
    const finalHash = props.includeHash ? hash : ""
    shareLink.value = `${origin}${pathname}${finalSearch}${finalHash}`
  }
})

// 为旧浏览器提供的降级复制方法
const fallbackCopyToClipboard = () => {
  const textArea = document.createElement("textarea")
  textArea.value = shareLink.value
  textArea.style.position = "fixed"
  textArea.style.left = "-999999px"
  textArea.style.top = "-999999px"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    document.execCommand("copy")
  } catch (err) {
    console.error("Fallback copy failed: ", err)
  }
  document.body.removeChild(textArea)
}

// 复制功能
async function copyToClipboard() {
  if (!shareLink.value || copied.value) return
  
  try {
    // 优先使用现代 Clipboard API
    await navigator.clipboard.writeText(shareLink.value)
  } catch (err) {
    console.error("Failed to copy using navigator.clipboard: ", err)
    // 失败时调用降级方案
    fallbackCopyToClipboard()
  }
  
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, props.copiedTimeout)
}
</script>

<template>
  <div class="article-share">
    <Transition name="fade" mode="out-in" appear>
      <button
        :key="copied ? 'copied' : 'share'"
        :class="['article-share__button', { copied }]"
        :aria-label="copied ? props.copiedText : props.shareText"
        aria-live="polite"
        @click="copyToClipboard"
        :disabled="!shareLink">
        <div v-if="!copied" class="content-wrapper">
          <span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </span>
          {{ props.shareText }}
        </div>
        <div v-else class="content-wrapper">
          <span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </span>
          {{ props.copiedText }}
        </div>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
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
  transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 7px 14px;
  width: 100%;
  overflow: hidden;
  color: var(--vp-c-text-1, #333);
  background-color: var(--vp-c-bg-alt, #f6f6f7);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  will-change: transform, box-shadow;
}

.article-share__button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
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

.article-share__button:not(:disabled):hover {
  transform: translateY(-1px);
  border-color: var(--vp-c-brand-soft, #ddf4ff);
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.article-share__button:not(:disabled):active {
  transform: scale(0.9);
}

.article-share__button.copied {
  color: var(--vp-c-brand-1, #007acc);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>