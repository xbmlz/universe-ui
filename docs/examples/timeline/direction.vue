<script setup lang="ts">
import { Timeline, TimelineItem } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-col">
    <Timeline direction="left">
      <TimelineItem
        title="左侧结构"
        time="09:00"
        status="finish"
      />
      <TimelineItem
        title="内容在轴线左侧"
        time="10:00"
        status="process"
      />
      <TimelineItem
        title="未到达"
        status="wait"
      />
    </Timeline>
  </div>
</template>
