<script setup lang="ts">
import { Avatar } from '@universe-ui/vue'

const people = ['林七七', '王芳', '陈晨', '赵一', '李雷']
</script>

<template>
  <div class="avatar-spaced">
    <Avatar
      v-for="name in people"
      :key="name"
      :name="name"
      :size="32"
    />
  </div>
</template>

<style>
.avatar-spaced {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
