<script setup lang="ts">
import { Rate } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-stack">
    <div class="rate-row">
      <span class="rate-label">3.5</span>
      <Rate
        :model-value="3.5"
        readonly
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">4.2</span>
      <Rate
        :model-value="4.2"
        readonly
      />
    </div>
  </div>
</template>

<style scoped>
.rate-row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.rate-label {
  width: 80px;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  white-space: nowrap;
  /* The label lines up with the 32px star row, not with the hint under it. */
  line-height: 32px;
}
</style>
