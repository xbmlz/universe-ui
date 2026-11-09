<script setup lang="ts">
import { Switch } from '@universe-ui/vue'
import { ref } from 'vue'

const notify = ref(true)
const sync = ref(false)
</script>

<template>
  <div class="setting-list">
    <div class="setting-row">
      <span class="setting-copy">
        <span class="setting-title">通知</span>
        <span class="setting-desc">开启后接收新的消息提醒</span>
      </span>
      <Switch v-model="notify" />
    </div>
    <div class="setting-row">
      <span class="setting-copy">
        <span class="setting-title">自动同步</span>
        <span class="setting-desc">开启后自动同步本地修改</span>
      </span>
      <Switch v-model="sync" size="sm" />
    </div>
  </div>
</template>

<style scoped>
.setting-list {
  display: flex;
  max-width: 420px;
  flex-direction: column;
  gap: 16px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.setting-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.setting-title {
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
}

.setting-desc {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-caption);
}
</style>
