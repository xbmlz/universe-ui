<script setup lang="ts">
import { Card } from '@universe-ui/vue'
</script>

<template>
  <div class="card-list">
    <div class="card-row">
      <Card
        title="仅描边"
        subtitle="Border"
      >
        <p class="card-text">同层级的模块划分，最轻的分隔方式。</p>
      </Card>
      <span class="card-label">border</span>
    </div>
    <div class="card-row">
      <Card
        title="仅投影"
        subtitle="Shadow-M"
        :border="false"
        shadow="s2"
      >
        <p class="card-text">需要一点空间感，但不想加框。</p>
      </Card>
      <span class="card-label">shadow</span>
    </div>
    <div class="card-row">
      <Card
        title="描边 + 投影"
        subtitle="Border + Shadow-S"
        shadow="s1"
      >
        <p class="card-text">层级最清楚的组合，用于浮起的卡片。</p>
      </Card>
      <span class="card-label">border + shadow</span>
    </div>
  </div>
</template>

<style scoped>
.card-list {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
}

.card-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 104px;
  align-items: center;
  gap: 16px;
}

.card-label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  white-space: nowrap;
}

.card-text {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}
</style>
