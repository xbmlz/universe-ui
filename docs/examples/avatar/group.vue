<script setup lang="ts">
import type { AvatarColor } from '@universe-ui/vue'
import { Avatar } from '@universe-ui/vue'

const colors: AvatarColor[] = [
  'blue',
  'purple',
  'turquoise',
  'green',
  'lime',
  'yellow',
  'orange',
  'carmine',
]
</script>

<template>
  <div class="ud-demo-col">
    <div class="ud-demo-row">
      <Avatar
        v-for="color in colors"
        :key="color"
        kind="group"
        :color="color"
        text="研发"
        :size="40"
      />
    </div>
    <div class="ud-demo-row">
      <Avatar
        kind="group"
        color="blue"
        text="研"
        :size="48"
      />
      <Avatar
        kind="group"
        color="purple"
        text="研发"
        :size="48"
      />
      <Avatar
        kind="group"
        color="green"
        text="产品设计"
        :size="48"
      />
      <Avatar
        kind="group"
        color="orange"
        text="前端工程化"
        :size="48"
      />
    </div>
  </div>
</template>
