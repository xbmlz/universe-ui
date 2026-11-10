<script setup lang="ts">
import type { BreadcrumbItem } from '@universe-ui/vue'
import { Breadcrumb } from '@universe-ui/vue'

const items: BreadcrumbItem[] = [
  { label: '飞书', href: '#' },
  { label: '工作台', href: '#' },
  { label: '审批中心', href: '#' },
  { label: '我的申请', href: '#' },
  { label: '差旅报销单详情' },
]
</script>

<template>
  <div class="breadcrumb-overflow">
    <Breadcrumb :items="items" />
  </div>
</template>

<style scoped>
.breadcrumb-overflow {
  /* Page scene: about half the content width; shrink to force middle folds. */
  max-width: 280px;
}
</style>
