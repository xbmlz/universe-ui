<script setup lang="ts">
import { Stepper } from '@universe-ui/vue'
import { ref } from 'vue'

const copies = ref(1)
</script>

<template>
  <div class="stepper-label">
    <Stepper
      v-model="copies"
      label="打印份数"
      required
      message="单次最多可打印 999 份"
      :min="1"
      :max="999"
    />
  </div>
</template>

<style scoped>
.stepper-label {
  width: 240px;
}
</style>
