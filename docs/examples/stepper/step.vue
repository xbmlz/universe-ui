<script setup lang="ts">
import { Stepper } from '@universe-ui/vue'
import { ref } from 'vue'

const single = ref(5)
const five = ref(10)
</script>

<template>
  <div class="ud-demo-col">
    <div class="stepper-row">
      <span class="stepper-row__label">步长 1</span>
      <Stepper v-model="single" :min="1" :max="999" />
    </div>
    <div class="stepper-row">
      <span class="stepper-row__label">步长 5</span>
      <Stepper v-model="five" :min="1" :max="999" :step="5" />
    </div>
    <p class="stepper-tip">
      按住按钮 800ms 后开始连续增减，松开停止。
    </p>
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

.stepper-tip {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
