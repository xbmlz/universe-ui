<script setup lang="ts">
import { Steps, StepsItem } from '@universe-ui/vue'
import { ref } from 'vue'

const active = ref(1)
</script>

<template>
  <div class="ud-demo-col">
    <Steps
      v-model="active"
      variant="simple"
    >
      <StepsItem title="1 选择地址" />
      <StepsItem title="2 填写支付" />
      <StepsItem title="3 确认订单" />
      <StepsItem title="4 完成" />
    </Steps>
    <Steps
      v-model="active"
      variant="simple"
      direction="vertical"
      style="max-width: 240px"
    >
      <StepsItem
        title="1 选择地址"
        description="空间有限时用点状节点"
      />
      <StepsItem
        title="2 填写支付"
        description="标题首行与节点中心对齐"
      />
      <StepsItem title="3 确认订单" />
      <StepsItem title="4 完成" />
    </Steps>
  </div>
</template>
