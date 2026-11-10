<script setup lang="ts">
import { Slider } from '@universe-ui/vue'
import { ref } from 'vue'

const normal = ref(60)
const disabled = ref(60)
const readonly = ref(60)
</script>

<template>
  <div class="ud-demo-col slider-states">
    <div class="slider-states__row">
      <span class="slider-states__label">Normal</span>
      <Slider v-model="normal" />
    </div>
    <div class="slider-states__row">
      <span class="slider-states__label">Disabled</span>
      <Slider v-model="disabled" disabled />
    </div>
    <div class="slider-states__row">
      <span class="slider-states__label">Readonly</span>
      <Slider v-model="readonly" readonly />
    </div>
  </div>
</template>

<style scoped>
.slider-states {
  width: 360px;
}

.slider-states__row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.slider-states__label {
  flex: none;
  width: 72px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
