<script setup lang="ts">
import { Card } from '@universe-ui/vue'
</script>

<template>
  <div class="state-row">
    <div class="state-row__item">
      <Card
        title="Normal"
        subtitle="Border 2 #DEE0E3"
      >
        <p class="state-text">静止状态，仅保留描边。</p>
      </Card>
      <span class="state-row__label">Normal</span>
    </div>
    <div class="state-row__item">
      <Card
        title="Hover"
        subtitle="Shadow-M-down"
        hoverable
      >
        <p class="state-text">鼠标移入后浮起一层投影。</p>
      </Card>
      <span class="state-row__label">Hover（移入查看）</span>
    </div>
    <div class="state-row__item">
      <Card
        title="Selected"
        subtitle="Border B500"
        hoverable
        selected
        clickable
      >
        <p class="state-text">已选中的卡片用品牌色描边加重。</p>
      </Card>
      <span class="state-row__label">Selected</span>
    </div>
    <div class="state-row__item">
      <Card
        title="Dragging"
        subtitle="95% 透明 + Shadow-L-down"
        dragging
      >
        <p class="state-text">拖拽中抬起并半透明。</p>
      </Card>
      <span class="state-row__label">Dragging</span>
    </div>
  </div>
</template>

<style scoped>
.state-row {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 16px;
}

.state-row__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.state-row__label {
  margin-top: auto;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.state-text {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}
</style>
