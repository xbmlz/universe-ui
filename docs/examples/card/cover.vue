<script setup lang="ts">
import { Card } from '@universe-ui/vue'

const items = [
  {
    title: '设计规范',
    text: '颜色、字号与间距的统一约定。',
    cover: 'linear-gradient(135deg, var(--ud-blue-4), var(--ud-blue-7))',
  },
  {
    title: '组件库',
    text: '37 个组件的实现与用法。',
    cover: 'linear-gradient(135deg, var(--ud-turquoise-600), var(--ud-green-600))',
  },
]
</script>

<template>
  <div class="cover-list">
    <Card
      v-for="item in items"
      :key="item.title"
      hoverable
      shadow="s1"
      :border="false"
    >
      <template #cover>
        <div
          class="cover-band"
          :style="{ background: item.cover }"
        />
      </template>
      <div class="cover-title">{{ item.title }}</div>
      <p class="cover-text">{{ item.text }}</p>
    </Card>
  </div>
</template>

<style scoped>
.cover-list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.cover-band {
  height: 96px;
}

.cover-title {
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  font-weight: var(--ud-font-weight-medium);
  line-height: var(--ud-line-body);
}

.cover-text {
  margin: 4px 0 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
