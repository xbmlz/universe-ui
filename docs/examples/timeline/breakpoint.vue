<script setup lang="ts">
import { Timeline, TimelineItem } from '@universe-ui/vue'
</script>

<template>
  <Timeline>
    <TimelineItem
      title="修改了项目名称"
      time="今天 16:28"
      status="finish"
    >
      由「Universe」改为「Universe UI」
    </TimelineItem>
    <TimelineItem
      title="添加了协作者"
      time="今天 11:02"
      status="finish"
    >
      邀请 林七七、王芳
    </TimelineItem>
    <TimelineItem
      title="创建了文档"
      time="昨天 18:40"
      status="finish"
    />
  </Timeline>
</template>
