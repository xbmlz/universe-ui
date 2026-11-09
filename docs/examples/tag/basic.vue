<script setup lang="ts">
import { Tag } from '@universe-ui/vue'

const colors = ['neutral', 'blue', 'turquoise', 'green', 'lime', 'yellow', 'orange', 'red', 'carmine', 'indigo', 'purple', 'cyan'] as const
</script>

<template>
  <div class="ud-demo-row">
    <Tag v-for="color in colors" :key="color" :color="color">
      {{ color }}
    </Tag>
  </div>
</template>
