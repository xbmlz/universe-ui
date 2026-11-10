<script setup lang="ts">
import { Button, Popover } from '@universe-ui/vue'

const items = [
  { type: 'info' as const, label: 'Info', title: '普通提示' },
  { type: 'success' as const, label: 'Success', title: '成功提示' },
  { type: 'warning' as const, label: 'Warning', title: '警告提示' },
  { type: 'error' as const, label: 'Error', title: '错误提示' },
]
</script>

<template>
  <div class="ud-demo-row">
    <Popover
      v-for="item in items"
      :key="item.type"
      :type="item.type"
      :title="item.title"
      content="Here is the description content."
    >
      <Button type="secondary">{{ item.label }}</Button>
    </Popover>
  </div>
</template>
