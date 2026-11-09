<script setup lang="ts">
import { Checkbox, CheckboxGroup } from '@universe-ui/vue'
import { ref } from 'vue'

const vertical = ref<(string | number)[]>(['design'])
const horizontal = ref<(string | number)[]>(['design', 'develop'])
</script>

<template>
  <div class="ud-demo-stack">
    <CheckboxGroup v-model="vertical" label="纵向排列">
      <Checkbox value="design">设计</Checkbox>
      <Checkbox value="develop">研发</Checkbox>
      <Checkbox value="pm">产品</Checkbox>
    </CheckboxGroup>

    <CheckboxGroup v-model="horizontal" direction="horizontal">
      <Checkbox value="design">设计</Checkbox>
      <Checkbox value="develop">研发</Checkbox>
      <Checkbox value="pm">产品</Checkbox>
    </CheckboxGroup>
  </div>
</template>
