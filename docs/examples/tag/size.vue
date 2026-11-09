<script setup lang="ts">
import { Tag } from '@universe-ui/vue'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="ud-demo-row">
    <Tag v-for="size in sizes" :key="size" variant="option" :size="size">
      {{ size }}
    </Tag>
  </div>
</template>
