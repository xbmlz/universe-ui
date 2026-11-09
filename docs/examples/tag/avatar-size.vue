<script setup lang="ts">
import { Tag } from '@universe-ui/vue'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const src = '/avatar-sample.png'
</script>

<template>
  <div class="ud-demo-row">
    <Tag
      v-for="size in sizes"
      :key="size"
      variant="avatar"
      :avatar-name="`尺寸 ${size}`"
      :avatar-src="src"
      :size="size"
    >
      {{ size }}
    </Tag>
    <Tag variant="avatar" avatar-name="李四" :avatar-src="src" closable>
      李四
    </Tag>
  </div>
</template>
