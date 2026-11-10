<script setup lang="ts">
import { Slider } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref(40)
const marks = {
  0: '0',
  25: '25',
  50: '50',
  75: '75',
  100: '100',
}
</script>

<template>
  <div class="slider-marks">
    <Slider v-model="value" :marks="marks" />
  </div>
</template>

<style scoped>
/* The mark labels sit under the rail, so the block leaves room for them. */
.slider-marks {
  width: 320px;
  padding-bottom: 32px;
}
</style>
