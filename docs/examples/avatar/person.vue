<script setup lang="ts">
import type { AvatarColor } from '@universe-ui/vue'
import { Avatar } from '@universe-ui/vue'

const colors: { color: AvatarColor, name: string }[] = [
  { color: 'blue', name: '林七七' },
  { color: 'purple', name: '王芳' },
  { color: 'turquoise', name: '陈晨' },
  { color: 'orange', name: '赵一' },
]
</script>

<template>
  <div class="ud-demo-row">
    <Avatar
      v-for="item in colors"
      :key="item.color"
      :name="item.name"
      :color="item.color"
      :size="40"
    />
  </div>
</template>
