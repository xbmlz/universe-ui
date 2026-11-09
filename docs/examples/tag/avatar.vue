<script setup lang="ts">
import { Tag } from '@universe-ui/vue'

const src = '/avatar-sample.png'
const states = [
  { key: 'normal', label: 'Normal' },
  { key: 'hover', label: 'Hover' },
  { key: 'press', label: 'Pressed' },
  { key: 'disabled', label: 'Disabled' },
] as const
</script>

<template>
  <div class="tag-avatar-states">
    <div class="tag-avatar-states__grid">
      <span />
      <span
        v-for="state in states"
        :key="state.key"
        class="tag-avatar-states__head"
      >{{ state.label }}</span>

      <span class="tag-avatar-states__row">普通头像标签</span>
      <div
        v-for="state in states"
        :key="`plain-${state.key}`"
        class="tag-avatar-states__cell"
      >
        <Tag
          variant="avatar"
          :class="`is-${state.key}`"
          avatar-name="Name"
          :avatar-src="src"
          :disabled="state.key === 'disabled'"
        >
          Name
        </Tag>
      </div>

      <span class="tag-avatar-states__row">带移除操作的头像标签</span>
      <div
        v-for="state in states"
        :key="`closable-${state.key}`"
        class="tag-avatar-states__cell"
      >
        <Tag
          variant="avatar"
          :class="`is-${state.key}`"
          avatar-name="Name"
          :avatar-src="src"
          closable
          :disabled="state.key === 'disabled'"
        >
          Name
        </Tag>
      </div>

      <span class="tag-avatar-states__row">移除按钮热区</span>
      <span />
      <div class="tag-avatar-states__cell">
        <p class="tag-avatar-states__caption">
          Hover icon
        </p>
        <Tag
          variant="avatar"
          class="is-icon-hover"
          avatar-name="Name"
          :avatar-src="src"
          closable
        >
          Name
        </Tag>
      </div>
      <div class="tag-avatar-states__cell">
        <p class="tag-avatar-states__caption">
          Press icon
        </p>
        <Tag
          variant="avatar"
          class="is-icon-press"
          avatar-name="Name"
          :avatar-src="src"
          closable
        >
          Name
        </Tag>
      </div>
      <span />
    </div>

    <p class="tag-avatar-states__note">
      表格固定呈现四种状态；把鼠标移到标签或 × 上可查看真实交互。
    </p>
  </div>
</template>

<style scoped>
.tag-avatar-states {
  width: 100%;
  overflow-x: auto;
}

.tag-avatar-states__grid {
  display: grid;
  grid-template-columns: 150px repeat(4, minmax(96px, 1fr));
  gap: 14px 12px;
  align-items: center;
  justify-items: start;
}

.tag-avatar-states__head,
.tag-avatar-states__row,
.tag-avatar-states__caption {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-caption);
}

.tag-avatar-states__head {
  color: var(--ud-color-text);
}

.tag-avatar-states__cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.tag-avatar-states__note {
  margin: 20px 0 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-caption);
}

.tag-avatar-states :deep(.ud-tag.is-hover) {
  background: var(--ud-tag-bg-hover);
}

.tag-avatar-states :deep(.ud-tag.is-press) {
  background: var(--ud-tag-bg-active);
}

.tag-avatar-states :deep(.ud-tag.is-icon-hover .ud-tag__close) {
  opacity: 1;
}

.tag-avatar-states :deep(.ud-tag.is-icon-press .ud-tag__close) {
  opacity: 0.8;
}
</style>
