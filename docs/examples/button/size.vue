<script setup lang="ts">
import { Button } from '@universe-ui/vue'

const sizes = ['xl', 'lg', 'md', 'sm', 'xs'] as const
</script>

<template>
  <div class="ud-demo-row" style="align-items: flex-end">
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
