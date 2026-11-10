<script setup lang="ts">
import { Timeline, TimelineItem } from '@universe-ui/vue'
import { ref } from 'vue'

const loading = ref(false)

async function onExpand() {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  loading.value = false
}
</script>

<template>
  <Timeline
    :collapse-tail="3"
    :collapse-loading="loading"
    @expand="onExpand"
  >
    <TimelineItem
      title="最新进展"
      time="今天 16:28"
      status="process"
    >
      点击「已收起 N 个节点」：悬停仅字体变蓝；异步展开时显示 loading
    </TimelineItem>
    <TimelineItem
      title="补充材料"
      time="今天 11:02"
      status="finish"
    />
    <TimelineItem
      title="初审通过"
      time="昨天 18:40"
      status="finish"
    />
    <TimelineItem
      title="提交申请"
      time="周一 09:15"
      status="finish"
    />
  </Timeline>
</template>
