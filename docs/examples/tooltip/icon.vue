<script setup lang="ts">
import { EmotionHappy, Help } from '@icon-park/vue-next'
import { Button, Tooltip } from '@universe-ui/vue'
</script>

<template>
  <div class="tooltip-icon">
    <div class="tooltip-icon__item">
      <Tooltip content="Sticker">
        <Button
          type="secondary"
          icon-only
          :icon="EmotionHappy"
          aria-label="Sticker"
        />
      </Tooltip>
      <span class="tooltip-icon__label">IconButton</span>
    </div>
    <div class="tooltip-icon__item">
      <Tooltip content="When the icon is a display post script, the icon is hovered state unchanged">
        <span
          class="tooltip-icon__hint"
          aria-label="说明"
        >
          <Help />
        </span>
      </Tooltip>
      <span class="tooltip-icon__label">Post script</span>
    </div>
  </div>
</template>

<style scoped>
.tooltip-icon {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
}

.tooltip-icon__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.tooltip-icon__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.tooltip-icon__hint {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--ud-color-icon-secondary);
  font-size: 16px;
}
</style>
