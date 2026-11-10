<script setup lang="ts">
import { Avatar } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Avatar
      kind="person"
      :size="40"
    />
    <Avatar
      kind="group"
      :size="40"
    />
    <Avatar
      kind="app"
      :size="40"
    />
    <Avatar
      kind="enterprise"
      :size="40"
    />
  </div>
</template>
