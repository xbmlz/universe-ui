<script setup lang="ts">
import { Steps, StepsItem } from '@universe-ui/vue'
import { ref } from 'vue'

const active = ref(1)
</script>

<template>
  <Steps
    v-model="active"
    direction="vertical"
    style="max-width: 280px"
  >
    <StepsItem
      title="选择收货地址"
      description="填写并确认收货信息"
    />
    <StepsItem
      title="填写支付信息"
      description="选择支付方式并核对金额"
    />
    <StepsItem
      title="确认订单"
      description="核对商品与优惠"
    />
    <StepsItem title="完成" />
  </Steps>
</template>
