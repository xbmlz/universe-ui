<script setup lang="ts">
import { Tooltip } from '@universe-ui/vue'
</script>

<template>
  <div class="tooltip-size">
    <Tooltip content="The maximum width does not exceed 320px">
      <span class="tooltip-size__trigger" />
    </Tooltip>
  </div>
</template>

<style scoped>
.tooltip-size {
  display: flex;
  justify-content: center;
  padding: 48px 0 16px;
}

.tooltip-size__trigger {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: var(--ud-radius-xs);
  background: var(--ud-color-brand-subtle);
}
</style>
