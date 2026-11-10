<script setup lang="ts">
import { Avatar } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-col">
    <div class="ud-demo-row">
      <Avatar
        kind="app"
        name="飞书"
        :size="40"
      />
      <Avatar
        kind="app"
        name="Lark Suite"
        color="purple"
        :size="40"
      />
      <Avatar
        kind="app"
        name="日历"
        color="turquoise"
        :size="40"
      />
    </div>
    <div class="ud-demo-row">
      <Avatar
        kind="enterprise"
        name="字节"
        :size="40"
      />
      <Avatar
        kind="enterprise"
        name="Acme"
        color="green"
        :size="40"
      />
    </div>
  </div>
</template>
