<script setup lang="ts">
import { InputNumber, Slider } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref(40)
</script>

<template>
  <div class="slider-input">
    <Slider v-model="value" />
    <InputNumber
      v-model="value"
      :min="0"
      :max="100"
      style="width: 88px"
    />
  </div>
</template>

<style scoped>
.slider-input {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 360px;
}
</style>
