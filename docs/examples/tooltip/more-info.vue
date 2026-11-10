<script setup lang="ts">
import { Button, Tag, Tooltip } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Tooltip content="10月12日">
      <Button type="secondary">Today</Button>
    </Tooltip>
    <Tooltip content="Liuhuixin @all">
      <span
        class="tooltip-avatar"
        aria-label="Liuhuixin"
      >刘</span>
    </Tooltip>
    <Tooltip content="On Leave">
      <Tag
        variant="status"
        status="failure"
        marker="none"
      >
        请假
      </Tag>
    </Tooltip>
  </div>
</template>

<style scoped>
.tooltip-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--ud-color-brand-subtle);
  color: var(--ud-color-brand);
  font-size: var(--ud-font-size-body-sm);
  font-weight: var(--ud-font-weight-medium);
  line-height: 1;
}
</style>
