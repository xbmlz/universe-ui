<script setup lang="ts">
import { Avatar } from '@universe-ui/vue'

const src = '/avatar-sample.png'
</script>

<template>
  <div class="ud-demo-row">
    <Avatar
      :src="src"
      name="张三"
      :size="40"
    />
    <Avatar
      :src="src"
      name="产品"
      kind="app"
      :size="40"
    />
    <Avatar
      src="/missing-avatar.png"
      name="加载失败回退"
      :size="40"
    />
  </div>
</template>
