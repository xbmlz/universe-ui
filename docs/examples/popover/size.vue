<script setup lang="ts">
import { Button, Popover } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Popover
      size="sm"
      title="小尺寸"
      content="上下 12px、左右 16px。推荐宽 280px，最大 420×480。"
    >
      <Button type="secondary">Small</Button>
    </Popover>
    <Popover
      size="lg"
      title="大尺寸"
      title-strong
      content="上下 20px、左右 24px。复杂内容时标题可用 16px Medium。"
    >
      <Button type="secondary">Large</Button>
    </Popover>
  </div>
</template>
