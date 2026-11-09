<script setup lang="ts">
import { Select } from '@universe-ui/vue'
import { ref } from 'vue'

const sizes = ['sm', 'md', 'lg'] as const
const value = ref<string | null>(null)
const options = [
  { value: 'design', label: '设计' },
  { value: 'develop', label: '研发' },
  { value: 'pm', label: '产品' },
]
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 320px">
    <Select
      v-for="size in sizes"
      :key="size"
      v-model="value"
      :options="options"
      :size="size"
      :placeholder="`尺寸 ${size}`"
    />
  </div>
</template>
