<script setup lang="ts">
import { Stepper } from '@universe-ui/vue'
import { ref } from 'vue'

const low = ref(1)
const high = ref(999)
</script>

<template>
  <div class="ud-demo-col">
    <div class="stepper-row">
      <span class="stepper-row__label">已达最小值</span>
      <Stepper v-model="low" :min="1" :max="999" />
    </div>
    <div class="stepper-row">
      <span class="stepper-row__label">已达最大值</span>
      <Stepper v-model="high" :min="1" :max="999" />
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
