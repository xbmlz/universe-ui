<script setup lang="ts">
import { Radio, RadioGroup } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string | number | null>('design')
const buttonValue = ref<string | number | null>('design')
const standalone = ref<string | number | null>('a')
</script>

<template>
  <div class="ud-demo-stack">
    <RadioGroup v-model="value" disabled>
      <Radio value="design">设计</Radio>
      <Radio value="develop">研发</Radio>
      <Radio value="pm">产品</Radio>
    </RadioGroup>

    <RadioGroup v-model="buttonValue" variant="button" disabled>
      <Radio value="design">设计</Radio>
      <Radio value="develop">研发</Radio>
    </RadioGroup>

    <div class="ud-demo-row">
      <Radio v-model="standalone" value="a" disabled>禁用，已选中</Radio>
      <Radio v-model="standalone" value="b" disabled>禁用，未选中</Radio>
    </div>
  </div>
</template>
