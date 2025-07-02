<script setup lang="ts">
import { computed, ref } from "vue"

export interface ArticleShareProps {
  /** 分享按钮图标 SVG 字符串 */
  icon?: string
  /** 分享按钮文本 */
  text?: string
  /** 复制成功后的图标 SVG 字符串 */
  copiedIcon?: string
  /** 复制成功后的文本 */
  copiedText?: string
  /** 是否包含 URL 查询参数 */
  includeQuery?: boolean
  /** 是否包含 URL 哈希值 */
  includeHash?: boolean
  /** 复制成功状态持续时间(毫秒) */
  timeout?: number
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  customStyle?: Record<string, any>
}

const props = withDefaults(defineProps<ArticleShareProps>(), {
  icon: `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" style="vertical-align: -0.125em"><path fill="currentColor" fill-rule="evenodd" d="M13.803 5.333c0-1.84 1.5-3.333 3.348-3.333A3.34 3.34 0 0 1 20.5 5.333c0 1.841-1.5 3.334-3.349 3.334a3.35 3.35 0 0 1-2.384-.994l-4.635 3.156a3.34 3.34 0 0 1-.182 1.917l5.082 3.34a3.35 3.35 0 0 1 2.12-.753a3.34 3.34 0 0 1 3.348 3.334C20.5 20.507 19 22 17.151 22a3.34 3.34 0 0 1-3.348-3.333a3.3 3.3 0 0 1 .289-1.356L9.05 14a3.35 3.35 0 0 1-2.202.821A3.34 3.34 0 0 1 3.5 11.487a3.34 3.34 0 0 1 3.348-3.333c1.064 0 2.01.493 2.623 1.261l4.493-3.059a3.3 3.3 0 0 1-.161-1.023" clip-rule="evenodd"></path></svg>`,
  text: "分享链接",
  copiedIcon: `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" style="vertical-align: -0.125em"><path fill="currentColor" d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"></path></svg>`,
  copiedText: "复制成功",
  includeQuery: false,
  includeHash: false,
  timeout: 2000,
})

defineOptions({ name: "ArticleShare" })

// 复制功能
const copied = ref(false)
const isClient =
  typeof window !== "undefined" && typeof document !== "undefined"

const copy = async (text: string) => {
  if (!isClient) return

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
    } else {
      // 降级方案
      const input = document.createElement("input")
      input.setAttribute("readonly", "readonly")
      input.setAttribute("value", text)
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
    }

    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, props.timeout)
  } catch (error) {
    console.error("复制失败:", error)
  }
}

// 生成分享链接
const shareLink = computed(() => {
  if (!isClient) return ""

  const { origin, pathname, search, hash } = location
  return `${origin}${pathname}${props.includeQuery ? search : ""}${props.includeHash ? hash : ""}`
})

// 处理分享点击
const handleShare = () => {
  copy(shareLink.value)
}
</script>

<template>
  <div :class="['article-share', className]" :style="customStyle">
    <button
      :class="[
        'article-share__button',
        { 'article-share__button--copied': copied },
      ]"
      :aria-label="copied ? copiedText : text"
      aria-live="polite"
      @click="handleShare">
      <div v-if="!copied" class="article-share__content">
        <span class="article-share__icon" v-html="icon" />
        <span class="article-share__text">{{ text }}</span>
      </div>

      <div v-else class="article-share__content">
        <span class="article-share__icon" v-html="copiedIcon" />
        <span class="article-share__text">{{ copiedText }}</span>
      </div>
    </button>
  </div>
</template>

<style scoped>
.article-share {
  display: inline-block;
}

.article-share__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #ffffff;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
}

.article-share__button:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.article-share__button:focus {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}

.article-share__button:active {
  background-color: #f3f4f6;
}

.article-share__button--copied {
  background-color: #dcfce7;
  border-color: #16a34a;
  color: #16a34a;
}

.article-share__content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.article-share__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.article-share__text {
  white-space: nowrap;
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .article-share__button {
    background-color: #1f2937;
    border-color: #374151;
    color: #f3f4f6;
  }

  .article-share__button:hover {
    background-color: #111827;
    border-color: #6b7280;
  }

  .article-share__button:active {
    background-color: #0f172a;
  }

  .article-share__button--copied {
    background-color: #14532d;
    border-color: #22c55e;
    color: #22c55e;
  }
}
</style>
