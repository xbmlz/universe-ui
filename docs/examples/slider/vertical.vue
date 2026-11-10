<script setup lang="ts">
import { Slider } from '@universe-ui/vue'
import { ref } from 'vue'

const volume = ref(40)
const brightness = ref<[number, number]>([30, 70])
</script>

<template>
  <div class="ud-demo-row slider-vertical">
    <div class="slider-vertical__item">
      <Slider v-model="volume" vertical />
      <span class="slider-vertical__caption">单滑块</span>
    </div>
    <div class="slider-vertical__item">
      <Slider v-model="brightness" vertical />
      <span class="slider-vertical__caption">双滑块</span>
    </div>
  </div>
</template>

<style scoped>
.slider-vertical {
  gap: 48px;
}

.slider-vertical__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.slider-vertical__caption {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
