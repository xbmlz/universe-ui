<script setup lang="ts">
import { Steps, StepsItem } from '@universe-ui/vue'
</script>

<template>
  <Steps :model-value="2">
    <StepsItem title="选择收货地址" />
    <StepsItem title="填写支付信息" />
    <StepsItem
      title="确认订单"
      description="库存不足，请返回修改"
      status="error"
    />
    <StepsItem title="完成" />
  </Steps>
</template>
