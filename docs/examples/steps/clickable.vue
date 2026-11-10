<script setup lang="ts">
import { Button, Steps, StepsItem } from '@universe-ui/vue'
import { ref } from 'vue'

const active = ref(1)
const total = 4

function prev() {
  active.value = Math.max(0, active.value - 1)
}

function next() {
  active.value = Math.min(total - 1, active.value + 1)
}
</script>

<template>
  <div class="ud-demo-col">
    <Steps
      v-model="active"
      clickable
    >
      <StepsItem title="选择收货地址" />
      <StepsItem title="填写支付信息" />
      <StepsItem title="确认订单" />
      <StepsItem title="完成" />
    </Steps>
    <div class="ud-demo-row">
      <Button
        type="secondary"
        :disabled="active <= 0"
        @click="prev"
      >
        上一步
      </Button>
      <Button
        :disabled="active >= total - 1"
        @click="next"
      >
        下一步
      </Button>
    </div>
  </div>
</template>
