<script setup lang="ts">
import { Card } from '@universe-ui/vue'
import { ListTwo, Mail, User } from '@icon-park/vue-next'

const items = [
  { title: 'Document', meta: '5-20 14:25 Name', icon: ListTwo, color: 'var(--ud-blue-4)' },
  { title: 'Message', meta: '5-20 14:25 Name', icon: Mail, color: 'var(--ud-purple-500)' },
  { title: 'Profile', meta: '5-20 14:25 Name', icon: User, color: 'var(--ud-turquoise-600)' },
]
</script>

<template>
  <div class="media-list">
    <Card
      v-for="item in items"
      :key="item.title"
      hoverable
      clickable
    >
      <div class="media-card">
        <span
          class="media-card__icon"
          :style="{ background: item.color }"
        >
          <component
            :is="item.icon"
            :size="18"
            fill="var(--ud-color-text-inverse)"
          />
        </span>
        <div class="media-card__text">
          <div class="media-card__title">{{ item.title }}</div>
          <div class="media-card__meta">{{ item.meta }}</div>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.media-list {
  display: flex;
  width: 100%;
  max-width: 360px;
  flex-direction: column;
  gap: 12px;
}

.media-card {
  display: flex;
  align-items: center;
  gap: 12px;
}

.media-card__icon {
  display: inline-flex;
  flex: none;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: var(--ud-radius-full);
  color: var(--ud-color-text-inverse);
}

.media-card__text {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.media-card__title {
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  font-weight: var(--ud-font-weight-medium);
  line-height: var(--ud-line-body);
}

.media-card__meta {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
