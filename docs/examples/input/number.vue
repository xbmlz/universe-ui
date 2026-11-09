<script setup lang="ts">
import { InputNumber } from '@universe-ui/vue'
import { ref } from 'vue'

const count = ref(4)
</script>

<template>
  <InputNumber
    v-model="count"
    :min="0"
    :max="10"
    :step="2"
    label="数量"
    message="每次增加或减少 2"
    style="max-width: 240px"
  />
</template>
