<script setup lang="ts">
import { Steps, StepsItem } from '@universe-ui/vue'
import { ref } from 'vue'

const active = ref(1)
</script>

<template>
  <Steps v-model="active">
    <StepsItem title="选择收货地址" />
    <StepsItem title="填写支付信息" />
    <StepsItem title="确认订单" />
    <StepsItem title="完成" />
  </Steps>
</template>
