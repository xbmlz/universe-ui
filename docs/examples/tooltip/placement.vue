<script setup lang="ts">
import type { TooltipPlacement } from '@universe-ui/vue'
import { Tooltip } from '@universe-ui/vue'

const placements: TooltipPlacement[] = [
  'topLeft',
  'top',
  'topRight',
  'leftTop',
  'rightTop',
  'left',
  'right',
  'leftBottom',
  'rightBottom',
  'bottomLeft',
  'bottom',
  'bottomRight',
]
</script>

<template>
  <div class="tooltip-placement">
    <Tooltip
      v-for="item in placements"
      :key="item"
      class="tooltip-placement__item"
      :class="`tooltip-placement__item--${item}`"
      :content="item"
      :placement="item"
    >
      <span class="tooltip-placement__cell" />
    </Tooltip>
  </div>
</template>

<style scoped>
.tooltip-placement {
  position: relative;
  box-sizing: border-box;
  width: min(100%, 420px);
  height: 280px;
  margin: 24px auto;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-s);
  background: var(--ud-color-bg-white);
}

.tooltip-placement__item {
  position: absolute;
}

.tooltip-placement__cell {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: var(--ud-radius-xs);
  background: var(--ud-color-brand-subtle);
}

.tooltip-placement__item--topLeft { top: 16px; left: 72px; }
.tooltip-placement__item--top { top: 16px; left: 50%; margin-left: -12px; }
.tooltip-placement__item--topRight { top: 16px; right: 72px; }

.tooltip-placement__item--bottomLeft { bottom: 16px; left: 72px; }
.tooltip-placement__item--bottom { bottom: 16px; left: 50%; margin-left: -12px; }
.tooltip-placement__item--bottomRight { bottom: 16px; right: 72px; }

.tooltip-placement__item--leftTop { top: 56px; left: 16px; }
.tooltip-placement__item--left { top: 50%; left: 16px; margin-top: -12px; }
.tooltip-placement__item--leftBottom { bottom: 56px; left: 16px; }

.tooltip-placement__item--rightTop { top: 56px; right: 16px; }
.tooltip-placement__item--right { top: 50%; right: 16px; margin-top: -12px; }
.tooltip-placement__item--rightBottom { bottom: 56px; right: 16px; }
</style>
