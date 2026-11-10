<script setup lang="ts">
import type { BreadcrumbItem } from '@universe-ui/vue'
import { Breadcrumb } from '@universe-ui/vue'
import { ref } from 'vue'

const items: BreadcrumbItem[] = [
  { label: '首页', href: '#' },
  { label: '文档', href: '#' },
  { label: '组件', href: '#' },
  { label: '面包屑' },
]

const last = ref('面包屑')

function onSelect(index: number) {
  last.value = items[index]?.label ?? ''
}
</script>

<template>
  <div class="ud-demo-col">
    <Breadcrumb
      :items="items"
      @select="onSelect"
    />
    <p class="breadcrumb-basic__hint">
      最近点击：{{ last }}
    </p>
  </div>
</template>

<style scoped>
.breadcrumb-basic__hint {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
