<script setup lang="ts">
import { Timeline, TimelineItem } from '@universe-ui/vue'
</script>

<template>
  <Timeline>
    <TimelineItem
      title="资料已通过"
      time="09:00"
      status="success"
    />
    <TimelineItem
      title="缺少盖章页"
      time="10:20"
      status="warning"
    >
      可继续补充后重新提交
    </TimelineItem>
    <TimelineItem
      title="格式异常"
      time="11:05"
      status="error"
    >
      不影响后续节点推进
    </TimelineItem>
    <TimelineItem
      title="审核失败"
      time="11:40"
      status="failed"
    >
      流程在此终止；连接线不再向下延伸
    </TimelineItem>
  </Timeline>
</template>
