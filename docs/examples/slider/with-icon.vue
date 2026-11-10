<script setup lang="ts">
import { VolumeSmall } from '@icon-park/vue-next'
import { Slider } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref(60)
</script>

<template>
  <div class="slider-icon">
    <VolumeSmall :size="16" fill="currentColor" />
    <Slider v-model="value" />
    <span class="slider-icon__value">{{ value }}</span>
  </div>
</template>

<style scoped>
.slider-icon {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 320px;
  color: var(--ud-color-icon);
}

.slider-icon__value {
  min-width: 24px;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
  text-align: right;
}
</style>
