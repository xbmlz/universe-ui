<script setup lang="ts">
import { Select } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string | null>('design')
const empty = ref<string | null>(null)
const options = [
  { value: 'design', label: '设计' },
  { value: 'develop', label: '研发' },
  { value: 'pm', label: '产品' },
]
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 320px">
    <Select v-model="value" :options="options" disabled label="禁用" />
    <Select v-model="value" :options="options" readonly label="只读" />
    <Select v-model="empty" :options="options" clearable placeholder="可清除" />
    <Select v-model="empty" :options="options" error message="请选择角色" placeholder="错误状态" />
    <Select v-model="empty" :options="options" loading placeholder="加载中" />
    <Select v-model="empty" :options="[]" empty-text="暂无可选项" placeholder="空列表" />
  </div>
</template>
