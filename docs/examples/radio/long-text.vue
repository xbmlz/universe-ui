<script setup lang="ts">
import { Radio, RadioGroup } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string | number | null>('long')
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 360px">
    <RadioGroup v-model="value" variant="button">
      <Radio value="long">
        这是一个非常长的选项文本，用来观察按钮型单选的长文本省略规则
      </Radio>
      <Radio value="short">
        短选项
      </Radio>
    </RadioGroup>
  </div>
</template>
