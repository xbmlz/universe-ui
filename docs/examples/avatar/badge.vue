<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'

const src = '/avatar-sample.png'
</script>

<template>
  <div class="ud-demo-row">
    <Badge
      round
      :count="3"
    >
      <Avatar
        :src="src"
        name="张三"
        :size="32"
      />
    </Badge>
    <Badge
      round
      dot
      dot-size="lg"
      placement="bottom-right"
      :tone="1"
      ring
    >
      <Avatar
        name="李四"
        :size="32"
      />
    </Badge>
    <Badge
      round
      color="grey"
      :count="12"
    >
      <Avatar
        kind="app"
        name="日历"
        :size="32"
      />
    </Badge>
  </div>
</template>
