<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const limited = ref('a')
const tighter = ref('a')

const longLabel = '这是一个非常长的标签页标题，用于演示超长文案'
</script>

<template>
  <div class="tabs-maxwidth">
    <div class="tabs-maxwidth__row">
      <span class="tabs-maxwidth__label">默认最大宽度 240px（推荐）</span>
      <Tabs v-model="limited" divider overflow="none">
        <Tab value="a">{{ longLabel }}</Tab>
        <Tab value="b">Tab 2</Tab>
      </Tabs>
    </div>
    <div class="tabs-maxwidth__row">
      <span class="tabs-maxwidth__label">最大宽度 96px</span>
      <Tabs v-model="tighter" divider :label-max-width="96" overflow="none">
        <Tab value="a">{{ longLabel }}</Tab>
        <Tab value="b">Tab 2</Tab>
      </Tabs>
    </div>
    <p class="tabs-maxwidth__note">
      超出部分用省略号截断，标签宽度不会把整行撑开；设计稿把「不限制最大宽度」标为避免使用。
    </p>
  </div>
</template>

<style scoped>
.tabs-maxwidth {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 28px;
}

.tabs-maxwidth__row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.tabs-maxwidth__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.tabs-maxwidth__note {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body);
}
</style>
