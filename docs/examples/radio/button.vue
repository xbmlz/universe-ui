<script setup lang="ts">
import { Radio, RadioGroup } from '@universe-ui/vue'
import { ref } from 'vue'

const sm = ref<string | number | null>('md')
const md = ref<string | number | null>('md')
const lg = ref<string | number | null>('md')
</script>

<template>
  <div class="ud-demo-stack">
    <RadioGroup v-model="sm" variant="button" size="sm">
      <Radio value="sm">小</Radio>
      <Radio value="md">中</Radio>
      <Radio value="lg">大</Radio>
    </RadioGroup>

    <RadioGroup v-model="md" variant="button" size="md">
      <Radio value="sm">小</Radio>
      <Radio value="md">中</Radio>
      <Radio value="lg">大</Radio>
    </RadioGroup>

    <RadioGroup v-model="lg" variant="button" size="lg">
      <Radio value="sm">小</Radio>
      <Radio value="md">中</Radio>
      <Radio value="lg">大</Radio>
    </RadioGroup>
  </div>
</template>
