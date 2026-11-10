<script setup lang="ts">
import { Stepper } from '@universe-ui/vue'
import { ref } from 'vue'

const sm = ref(1)
const md = ref(1)
const lg = ref(1)
</script>

<template>
  <div class="ud-demo-col">
    <div class="stepper-row">
      <span class="stepper-row__label">sm 28px</span>
      <Stepper v-model="sm" size="sm" :min="1" :max="999" />
    </div>
    <div class="stepper-row">
      <span class="stepper-row__label">md 32px</span>
      <Stepper v-model="md" size="md" :min="1" :max="999" />
    </div>
    <div class="stepper-row">
      <span class="stepper-row__label">lg 40px</span>
      <Stepper v-model="lg" size="lg" :min="1" :max="999" />
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
