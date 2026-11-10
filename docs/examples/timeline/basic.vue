<script setup lang="ts">
import { Timeline, TimelineItem } from '@universe-ui/vue'
</script>

<template>
  <Timeline>
    <TimelineItem
      title="订单已提交"
      time="2024-03-01 09:12"
      status="finish"
    >
      买家提交订单，等待商家确认
    </TimelineItem>
    <TimelineItem
      title="商品出库"
      time="2024-03-01 14:30"
      status="process"
    >
      仓库已打包，正在交接快递
    </TimelineItem>
    <TimelineItem
      title="运输中"
      status="wait"
    />
    <TimelineItem
      title="已签收"
      status="wait"
    />
  </Timeline>
</template>
