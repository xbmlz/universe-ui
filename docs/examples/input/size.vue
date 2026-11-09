<script setup lang="ts">
import { Input } from '@universe-ui/vue'
import { ref } from 'vue'

const sizes = ['sm', 'md', 'lg'] as const
const value = ref('')
</script>

<template>
  <div class="ud-demo-col" style="width: 320px">
    <Input
      v-for="size in sizes"
      :key="size"
      v-model="value"
      :size="size"
      :placeholder="`尺寸 ${size}`"
    />
  </div>
</template>
