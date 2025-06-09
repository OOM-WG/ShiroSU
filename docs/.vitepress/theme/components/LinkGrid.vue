<template>
  <div class="link-grid">
    <slot />
  </div>
</template>

<script lang="ts" setup>
// 链接网格容器组件
</script>

<style scoped>
.link-grid {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 16px !important;
  margin: 20px 0 !important;
  align-items: flex-start !important;
}

/* 确保子元素不被覆盖 */
.link-grid > * {
  flex-shrink: 0 !important;
  display: inline-flex !important;
}
</style>
