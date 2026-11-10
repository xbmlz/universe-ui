<script setup lang="ts">
import { Steps, StepsItem } from '@universe-ui/vue'
import { ref } from 'vue'

const active = ref(1)
</script>

<template>
  <Steps v-model="active">
    <StepsItem
      title="选择收货地址"
      description="确认收货人与联系方式"
    />
    <StepsItem
      title="填写支付信息"
      description="选择支付方式"
    />
    <StepsItem
      title="确认订单"
      description="核对商品明细"
    />
    <StepsItem
      title="完成"
      description="等待发货"
    />
  </Steps>
</template>
