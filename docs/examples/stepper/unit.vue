<script setup lang="ts">
import { Stepper } from '@universe-ui/vue'
import { ref } from 'vue'

const copies = ref(3)
const seats = ref(1)
</script>

<template>
  <div class="ud-demo-col">
    <div class="stepper-unit">
      <Stepper v-model="copies" :min="1" :max="999" />
      <span class="stepper-unit__text">份</span>
    </div>
    <div class="stepper-unit">
      <Stepper v-model="seats" :min="1" :max="20" />
      <span class="stepper-unit__text">台</span>
    </div>
  </div>
</template>

<style scoped>
.stepper-unit {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stepper-unit__text {
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}
</style>
