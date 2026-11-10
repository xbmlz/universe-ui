<script setup lang="ts">
import { Card } from '@universe-ui/vue'

const pairs = [
  { page: 'n00', card: 'white', label: '页面 N00 · 卡片 N00', note: '不推荐', bad: true },
  { page: 'n00', card: 'muted', label: '页面 N00 · 卡片 N100', note: '推荐', bad: false },
  { page: 'n100', card: 'white', label: '页面 N100 · 卡片 N00', note: '推荐', bad: false },
  { page: 'n100', card: 'muted', label: '页面 N100 · 卡片 N100', note: '不推荐', bad: true },
] as const
</script>

<template>
  <div class="page-matrix">
    <div
      v-for="pair in pairs"
      :key="pair.label"
      class="page-swatch"
    >
      <div
        class="page-swatch__canvas"
        :class="`page-swatch__canvas--${pair.page}`"
      >
        <Card
          :surface="pair.card"
          title="卡片标题"
          shadow="none"
        >
          <p class="page-swatch__text">正文说明文字。</p>
        </Card>
      </div>
      <span
        class="page-swatch__label"
        :class="{ 'is-bad': pair.bad }"
      >{{ pair.label }} · {{ pair.note }}</span>
    </div>
  </div>
</template>

<style scoped>
.page-matrix {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.page-swatch {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 8px;
}

.page-swatch__canvas {
  padding: 16px;
  border-radius: var(--ud-radius-s);
  outline: 1px dashed var(--ud-color-border);
  outline-offset: -1px;
}

.page-swatch__canvas--n00 {
  background: var(--ud-color-bg-surface);
}

.page-swatch__canvas--n100 {
  background: var(--ud-color-bg-2);
}

.page-swatch__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.page-swatch__label.is-bad {
  color: var(--ud-color-danger-text);
}

.page-swatch__text {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
