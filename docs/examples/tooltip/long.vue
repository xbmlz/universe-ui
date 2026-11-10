<script setup lang="ts">
import { Button, Tooltip } from '@universe-ui/vue'

const longText = '容器宽度跟随文本增加，最大宽度不超过 320px。超出后换行，高度随文本增加。极端场景（日历详情、弹窗详情）才允许放到 400px。'
</script>

<template>
  <div class="ud-demo-row">
    <Tooltip :content="longText">
      <Button type="secondary">长文案</Button>
    </Tooltip>
  </div>
</template>
