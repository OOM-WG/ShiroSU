<template>
  <div class="enhanced-home-layout">
    <!-- 内容层 -->
    <div class="home-content">
      <!-- 这里会显示VitePress的默认home布局内容 -->
      <slot />
      <!-- home-hero-info-after 插槽 -->
      <slot name="home-hero-info-after" />
      <!-- 自定义内容插槽，可在 home-hero-info-after 之后插入内容 -->
      <slot name="custom-home-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"

onMounted(() => {
  const homeContent = document.querySelector(".home-content")
  if (homeContent) {
    homeContent.classList.add("animate-in")
  }
})
</script>

<style scoped>
.enhanced-home-layout {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.home-content {
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.home-content.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
