<script setup lang="ts">
import { Timeline, TimelineItem } from '@universe-ui/vue'
</script>

<template>
  <Timeline direction="alternate">
    <TimelineItem
      title="订单已提交"
      time="09:12"
      status="finish"
    >
      陈述句辅助信息
    </TimelineItem>
    <TimelineItem
      title="商品出库"
      time="14:30"
      status="finish"
    />
    <TimelineItem
      title="运输中"
      time="18:00"
      status="process"
    />
    <TimelineItem
      title="已签收"
      status="wait"
    />
  </Timeline>
</template>
