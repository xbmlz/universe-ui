<script setup lang="ts">
import { Button } from '@universe-ui/vue'

const sizes = ['xl', 'lg', 'md', 'sm', 'xs'] as const
</script>

<template>
  <div class="flex flex-wrap items-end justify-center gap-3">
    <Button
      v-for="size in sizes"
      :key="size"
      type="primary"
      :size="size"
    >
      {{ size }}
    </Button>
  </div>
</template>
