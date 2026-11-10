<script setup lang="ts">
import { Avatar } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-col">
    <div class="ud-demo-row">
      <Avatar
        name="林七七"
        :size="40"
      />
      <Avatar
        name="John Smith"
        :size="40"
      />
      <Avatar
        name="工藤新一"
        name-locale="ja"
        :size="40"
      />
    </div>
    <p class="avatar-hint">
      中文取后两字、英文取首字母、日文（显式 locale）取姓氏首字
    </p>
  </div>
</template>

<style>
.avatar-hint {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-caption);
}
</style>
