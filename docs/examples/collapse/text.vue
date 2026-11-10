<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@universe-ui/vue'

const left = ref<Array<string | number>>([])
const right = ref<Array<string | number>>([])
</script>

<template>
  <div class="collapse-text">
    <Collapse v-model="left">
      <CollapseItem
        name="left"
        mode="text"
        :lines="3"
      >
        用于大段落文本的折叠。折叠时默认露出 3 行（也可用 5 行），底部用「展开」+ 箭头；展开后「收起」单独一行，与文本间距 4px。本示例触发项在左下方。飞书 Universe Design 建议在空间有限时用这种方式收纳长文，避免一屏信息过载，同时保留继续阅读的入口。
      </CollapseItem>
    </Collapse>
    <Collapse v-model="right">
      <CollapseItem
        name="right"
        mode="text"
        :lines="3"
        text-placement="right"
      >
        触发项也可以放在文本容器右下方。折叠行数可自定，规范通常建议 3 或 5 行。展开后仍保留「收起」；若不需要收起能力，可设 allow-collapse 为 false。
      </CollapseItem>
    </Collapse>
  </div>
</template>

<style scoped>
.collapse-text {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 520px;
}
</style>
