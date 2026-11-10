<script setup lang="ts">
import { Timeline, TimelineItem } from '@universe-ui/vue'
</script>

<template>
  <div class="timeline-spacing">
    <div>
      <p class="timeline-spacing__label">
        紧凑 16px
      </p>
      <Timeline spacing="compact">
        <TimelineItem
          title="节点一"
          status="finish"
        />
        <TimelineItem
          title="节点二"
          status="process"
        />
        <TimelineItem
          title="节点三"
          status="wait"
        />
      </Timeline>
    </div>
    <div>
      <p class="timeline-spacing__label">
        普通 24px
      </p>
      <Timeline spacing="normal">
        <TimelineItem
          title="节点一"
          status="finish"
        />
        <TimelineItem
          title="节点二"
          status="process"
        />
        <TimelineItem
          title="节点三"
          status="wait"
        />
      </Timeline>
    </div>
    <div>
      <p class="timeline-spacing__label">
        宽松 32px
      </p>
      <Timeline spacing="loose">
        <TimelineItem
          title="节点一"
          status="finish"
        />
        <TimelineItem
          title="节点二"
          status="process"
        />
        <TimelineItem
          title="节点三"
          status="wait"
        />
      </Timeline>
    </div>
  </div>
</template>

<style>
.timeline-spacing {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
}

.timeline-spacing__label {
  margin: 0 0 12px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-caption);
}
</style>
