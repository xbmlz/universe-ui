<script setup lang="ts">
import { Select } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string | null>(null)
const options = [
  { value: 'design', label: '设计' },
  { value: 'develop', label: '研发' },
  { value: 'pm', label: '产品' },
  { value: 'ops', label: '运营' },
  { value: 'finance', label: '财务' },
]
</script>

<template>
  <Select
    v-model="value"
    :options="options"
    filterable
    placeholder="搜索并选择角色"
    style="width: 280px"
  />
</template>
