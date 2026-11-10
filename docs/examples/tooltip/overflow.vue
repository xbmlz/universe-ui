<script setup lang="ts">
import { Tooltip } from '@universe-ui/vue'

const longTitle = 'This is a long tab title to show how the label is clipped'
</script>

<template>
  <div class="tooltip-overflow">
    <div class="tooltip-overflow__row">
      <span class="tooltip-overflow__label">截断时才出现</span>
      <div class="tooltip-overflow__clip">
        <Tooltip
          only-overflow
          :content="longTitle"
        >
          {{ longTitle }}
        </Tooltip>
      </div>
    </div>
    <div class="tooltip-overflow__row">
      <span class="tooltip-overflow__label">未截断不出现</span>
      <div class="tooltip-overflow__clip tooltip-overflow__clip--wide">
        <Tooltip
          only-overflow
          content="短标题"
        >
          短标题
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-overflow {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
}

.tooltip-overflow__row {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.tooltip-overflow__label {
  flex: none;
  width: 108px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.tooltip-overflow__clip {
  min-width: 0;
  max-width: 200px;
  overflow: hidden;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tooltip-overflow__clip--wide {
  max-width: none;
}

.tooltip-overflow__clip :deep(.ud-tooltip) {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
