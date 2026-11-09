<script setup lang="ts">
import { Select } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string | null>('design')
const options = [
  { value: 'design', label: '设计' },
  { value: 'develop', label: '研发' },
  { value: 'pm', label: '产品' },
]
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 320px">
    <Select v-model="value" :options="options" clearable label="清除" />
    <Select
      v-model="value"
      :options="options"
      clearable
      filterable
      placeholder="搜索并清除"
    />
  </div>
</template>
