<script setup lang="ts">
import type { CardRadius } from '@universe-ui/vue'
import { Card } from '@universe-ui/vue'

const items: Array<{ radius: CardRadius, name: string, size: string, hint: string }> = [
  { radius: 'xs', name: '4 px', size: '列表卡片', hint: '高度在 48 px 以内的短卡片。' },
  { radius: 's', name: '6 px', size: '默认', hint: '中等面积的卡片，默认档位。' },
  { radius: 'm', name: '8 px', size: '大卡片', hint: '内容较多的独立卡片。' },
  { radius: 'l', name: '10 px', size: '超大卡片', hint: '整屏级别的容器。' },
]
</script>

<template>
  <div class="card-row">
    <div
      v-for="item in items"
      :key="item.radius"
      class="card-row__item"
    >
      <Card
        :radius="item.radius"
        :title="item.name"
      >
        <p class="card-text">{{ item.hint }}</p>
      </Card>
      <span class="card-row__label">{{ item.radius }} · {{ item.size }}</span>
    </div>
  </div>
</template>

<style scoped>
.card-row {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 16px;
}

.card-row__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-row__label {
  margin-top: auto;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.card-text {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}
</style>
