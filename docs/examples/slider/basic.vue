<script setup lang="ts">
import { Slider } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref(60)
</script>

<template>
  <div class="slider-basic">
    <Slider v-model="value" />
    <span class="slider-basic__value">{{ value }}</span>
  </div>
</template>

<style scoped>
.slider-basic {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 320px;
}

.slider-basic__value {
  min-width: 32px;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
  text-align: right;
}
</style>
