<script setup lang="ts">
import { Radio, RadioGroup } from '@universe-ui/vue'
import { ref } from 'vue'

const vertical = ref<string | number | null>('design')
const horizontal = ref<string | number | null>('design')
</script>

<template>
  <div class="ud-demo-stack">
    <RadioGroup v-model="vertical">
      <Radio value="design">设计</Radio>
      <Radio value="develop">研发</Radio>
      <Radio value="pm">产品</Radio>
    </RadioGroup>

    <RadioGroup v-model="horizontal" direction="horizontal">
      <Radio value="design">设计</Radio>
      <Radio value="develop">研发</Radio>
      <Radio value="pm">产品</Radio>
    </RadioGroup>
  </div>
</template>
