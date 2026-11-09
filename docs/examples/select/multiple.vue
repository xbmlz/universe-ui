<script setup lang="ts">
import { Select } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string[]>(['design', 'develop', 'pm'])
const options = [
  { value: 'design', label: '设计' },
  { value: 'develop', label: '研发' },
  { value: 'pm', label: '产品' },
  { value: 'ops', label: '运营' },
  { value: 'finance', label: '财务' },
]
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 320px">
    <Select v-model="value" :options="options" multiple placeholder="可多选" />
    <Select v-model="value" :options="options" multiple :max-tag-count="2" placeholder="折叠多余标签" />
  </div>
</template>
