<template>
  <div class="article-metadata">
    <!-- 可以根据需要添加文章元数据显示 -->
    <!-- <span class="metadata-item" v-if="lastUpdated">
      最后更新：{{ formatDate(lastUpdated) }}
    </span> -->
  </div>
</template>

<script setup lang="ts">
// import { useData } from 'vitepress'
// import { computed } from 'vue'

// const { page } = useData()

// const lastUpdated = computed(() => page.value.lastUpdated)

// function formatDate(timestamp: number) {
//   return new Date(timestamp).toLocaleDateString('zh-CN')
// }
</script>

<!-- <style scoped>
.article-metadata {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin-left: 0.5em;
}

.metadata-item {
  display: inline-block;
}
</style> -->
