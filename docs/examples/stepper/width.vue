<script setup lang="ts">
import { Stepper } from '@universe-ui/vue'
import { ref } from 'vue'

const compact = ref(1)
const normal = ref(1)
const wide = ref(1)
</script>

<template>
  <div class="ud-demo-col">
    <div class="stepper-row">
      <span class="stepper-row__label">120px</span>
      <Stepper v-model="compact" :min="1" :max="999" :width="120" />
    </div>
    <div class="stepper-row">
      <span class="stepper-row__label">160px 默认</span>
      <Stepper v-model="normal" :min="1" :max="999" />
    </div>
    <div class="stepper-row">
      <span class="stepper-row__label">240px</span>
      <Stepper v-model="wide" :min="1" :max="999" :width="240" />
    </div>
  </div>
</template>

<style scoped>
.stepper-row {
  display: flex;
  align-items: center;
  gap: 24px;
}

.stepper-row__label {
  width: 96px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  white-space: nowrap;
}
</style>
