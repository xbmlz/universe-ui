<script setup lang="ts">
import { Select } from '@universe-ui/vue'
import { ref } from 'vue'

const underline = ref<string | null>('design')
const borderless = ref<string | null>('design')
const options = [
  { value: 'design', label: '设计' },
  { value: 'develop', label: '研发' },
  { value: 'pm', label: '产品' },
]
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 320px">
    <Select
      v-model="underline"
      :options="options"
      variant="underline"
      label="下划线选择框"
    />
    <Select
      v-model="borderless"
      :options="options"
      variant="borderless"
      label="无边界选择框"
    />
  </div>
</template>
