<script setup lang="ts">
import { Tag } from '@universe-ui/vue'

const statuses = [
  { value: 'pending', label: '待处理' },
  { value: 'success', label: '已完成' },
  { value: 'failure', label: '失败' },
  { value: 'awaiting', label: '等待中' },
  { value: 'negative', label: '已取消' },
] as const
</script>

<template>
  <div class="ud-demo-stack">
    <div class="ud-demo-row">
      <Tag
        v-for="item in statuses"
        :key="item.value"
        variant="status"
        :status="item.value"
      >
        {{ item.label }}
      </Tag>
    </div>

    <div class="ud-demo-row">
      <Tag variant="status" status="success" marker="none">无标记</Tag>
      <Tag variant="status" status="failure" marker="icon" status-icon="close-one">图标标记</Tag>
    </div>
  </div>
</template>
