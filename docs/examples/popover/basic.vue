<script setup lang="ts">
import { Button, Popover } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Popover
      title="标题"
      content="这里是气泡卡片的说明内容，用来补充目标元素的信息。"
    >
      <Button type="secondary">悬停查看</Button>
    </Popover>
  </div>
</template>
