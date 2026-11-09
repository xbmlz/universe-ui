<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="ud-demo-row">
    <Badge v-for="size in sizes" :key="size" round dot :dot-size="size">
      <Avatar name="张三" />
    </Badge>
  </div>
</template>
