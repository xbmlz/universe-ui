<script setup lang="ts">
import { Pagination } from '@universe-ui/vue'
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <div class="ud-demo-col">
    <Pagination
      v-model:page="page"
      :total="500"
      :page-size="10"
      :show-sizes="false"
    />
    <p class="pagination-many__hint">
      当前第 {{ page }} 页。悬停「…」会变成双箭头，点击跳转 ±5 页。
    </p>
  </div>
</template>

<style scoped>
.pagination-many__hint {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
