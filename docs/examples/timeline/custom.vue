<script setup lang="ts">
import { Local, Truck, User } from '@icon-park/vue-next'
import { Timeline, TimelineItem } from '@universe-ui/vue'
</script>

<template>
  <Timeline>
    <TimelineItem
      title="下单人确认"
      time="09:12"
      status="finish"
    >
      <template #icon>
        <User
          theme="filled"
          :size="12"
        />
      </template>
    </TimelineItem>
    <TimelineItem
      title="仓库发货"
      time="14:30"
      status="process"
    >
      <template #icon>
        <Truck
          theme="filled"
          :size="12"
        />
      </template>
      自定义节点图标
    </TimelineItem>
    <TimelineItem
      title="到达站点"
      status="wait"
    >
      <template #icon>
        <Local
          theme="filled"
          :size="12"
        />
      </template>
    </TimelineItem>
  </Timeline>
</template>
