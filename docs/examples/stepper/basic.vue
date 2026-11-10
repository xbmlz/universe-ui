<script setup lang="ts">
import { Stepper } from '@universe-ui/vue'
import { ref } from 'vue'

const count = ref(5)
</script>

<template>
  <div class="stepper-basic">
    <Stepper v-model="count" :min="1" :max="999" />
    <span class="stepper-basic__value">当前 {{ count }} 份</span>
  </div>
</template>

<style scoped>
.stepper-basic {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stepper-basic__value {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
