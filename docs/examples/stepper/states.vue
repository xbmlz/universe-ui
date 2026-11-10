<script setup lang="ts">
import { Stepper } from '@universe-ui/vue'
import { ref } from 'vue'

const normal = ref(5)
const disabled = ref(5)
const readonly = ref(5)
const invalid = ref(1000)
</script>

<template>
  <div class="ud-demo-stack">
    <div class="stepper-row">
      <span class="stepper-row__label">Normal</span>
      <Stepper v-model="normal" :min="1" :max="999" />
    </div>
    <div class="stepper-row">
      <span class="stepper-row__label">Disabled</span>
      <Stepper
        v-model="disabled"
        :min="1"
        :max="999"
        disabled
      />
    </div>
    <div class="stepper-row">
      <span class="stepper-row__label">Readonly</span>
      <Stepper
        v-model="readonly"
        :min="1"
        :max="999"
        readonly
      />
    </div>
    <div class="stepper-row">
      <span class="stepper-row__label">Error</span>
      <Stepper
        v-model="invalid"
        :min="1"
        :max="999"
        error
        message="份数不能超过 999 份"
      />
    </div>
  </div>
</template>

<style scoped>
.stepper-row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.stepper-row__label {
  width: 96px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  white-space: nowrap;
  /* The label lines up with the 32px control, not with the message under it. */
  line-height: 32px;
}
</style>
