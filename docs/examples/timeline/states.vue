<script setup lang="ts">
import { Timeline, TimelineItem } from '@universe-ui/vue'
</script>

<template>
  <Timeline spacing="compact">
    <TimelineItem
      title="已完成"
      status="finish"
    />
    <TimelineItem
      title="进行中"
      status="process"
    />
    <TimelineItem
      title="加载中"
      status="loading"
    />
    <TimelineItem
      title="未到达"
      status="wait"
    />
  </Timeline>
</template>
