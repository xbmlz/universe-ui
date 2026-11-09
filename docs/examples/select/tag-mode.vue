<script setup lang="ts">
import { Select } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string | null>(null)
const options = [
  { value: 'design', label: '设计团队 - 负责视觉规范与组件样式' },
  { value: 'develop', label: '研发团队 - 负责组件实现与接口' },
  { value: 'pm', label: '产品团队 - 负责需求与验收标准' },
]
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 380px">
    <Select v-model="value" :options="options" placeholder="单行选项" />
    <Select v-model="value" :options="options" :option-lines="2" placeholder="两行选项" />
  </div>
</template>
