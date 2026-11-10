<script setup lang="ts">
import { Rate } from '@universe-ui/vue'
import { ref } from 'vue'

const whole = ref(3)
const half = ref(2.5)
</script>

<template>
  <div class="ud-demo-stack">
    <div class="rate-row">
      <span class="rate-label">步长 1</span>
      <Rate
        v-model="whole"
        show-text
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">步长 0.5</span>
      <Rate
        v-model="half"
        allow-half
        show-text
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
