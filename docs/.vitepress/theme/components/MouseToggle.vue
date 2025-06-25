<!-- 鼠标特效开关组件 -->
<template>
  <div class="mouse-toggle-wrapper">
    <button
      @click="toggleMouseEffects"
      class="mouse-toggle-btn"
      :class="{ active: isEnabled }"
      :title="isEnabled ? '关闭鼠标特效' : '开启鼠标特效'">
      <span class="toggle-icon">{{ isEnabled ? "🎨" : "💤" }}</span>
      <span v-if="!screenMenu" class="toggle-text">
        {{ isEnabled ? "嘲讽开启" : "嘲讽关闭" }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue"

// Props from VitePress
defineProps({
  screenMenu: {
    type: Boolean,
    default: false,
  },
})

// 状态管理
const isEnabled = ref(false)
const STORAGE_KEY = "vitepress-mouse-effects-enabled"

// 提供全局状态
provide("mouseEffectsEnabled", isEnabled)

// 切换鼠标特效
const toggleMouseEffects = () => {
  if (typeof window === "undefined") return

  isEnabled.value = !isEnabled.value
  // 保存到本地存储
  localStorage.setItem(STORAGE_KEY, isEnabled.value.toString())

  // 触发自定义事件通知全局组件
  window.dispatchEvent(
    new CustomEvent("mouseEffectsToggle", {
      detail: { enabled: isEnabled.value },
    }),
  )
}

// 初始化状态
onMounted(() => {
  if (typeof window === "undefined") return

  // 从本地存储读取状态
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved !== null) {
    isEnabled.value = saved === "true"
  } else {
    // 默认开启
    isEnabled.value = true
    localStorage.setItem(STORAGE_KEY, "true")
  }

  // 初始化时也触发事件
  window.dispatchEvent(
    new CustomEvent("mouseEffectsToggle", {
      detail: { enabled: isEnabled.value },
    }),
  )
})
</script>

<style scoped>
.mouse-toggle-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.mouse-toggle-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  height: var(--vp-nav-height-mobile);
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 500;
  line-height: var(--vp-nav-height-mobile);
  cursor: pointer;
  transition: all 0.25s;
  user-select: none;
}

@media (min-width: 768px) {
  .mouse-toggle-btn {
    height: var(--vp-nav-height);
    line-height: var(--vp-nav-height);
  }
}

.mouse-toggle-btn:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.mouse-toggle-btn.active {
  background: transparent;
  color: var(--vp-c-brand-1);
}

.toggle-icon {
  font-size: 16px;
  line-height: 1;
}

.toggle-text {
  font-size: 12px;
  white-space: nowrap;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .mouse-toggle-btn {
    padding: 0 8px;
    gap: 0;
  }

  .toggle-text {
    display: none;
  }
}

/* 暗色主题适配 */
.dark .mouse-toggle-btn:hover {
  background: var(--vp-c-bg-alt);
}

.dark .mouse-toggle-btn.active {
  background: transparent;
}
</style>
