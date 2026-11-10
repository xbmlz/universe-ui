<script setup lang="ts">
import { Slider } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<[number, number]>([20, 60])
</script>

<template>
  <div class="slider-range">
    <Slider v-model="value" />
    <span class="slider-range__value">{{ value[0] }} - {{ value[1] }}</span>
  </div>
</template>

<style scoped>
.slider-range {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 320px;
}

.slider-range__value {
  min-width: 56px;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
  text-align: right;
}
</style>
