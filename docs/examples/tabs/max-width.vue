<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs, Tooltip } from '@universe-ui/vue'

const limited = ref('a')
const stretched = ref('a')

const longTitle = 'This is a long tab title to show how the label is clipped'
</script>

<template>
  <div class="tabs-maxwidth">
    <div class="tabs-maxwidth__row">
      <span class="tabs-maxwidth__label">限制最大宽度 240px（推荐）</span>
      <Tabs v-model="limited" variant="card" overflow="none">
        <Tab value="a">
          <Tooltip only-overflow :content="longTitle">{{ longTitle }}</Tooltip>
        </Tab>
        <Tab value="b">This is a tab</Tab>
        <Tab value="c">Tab</Tab>
        <Tab value="d">Tab</Tab>
        <Tab value="e">Tab</Tab>
      </Tabs>
      <div class="tabs-maxwidth__panel">
        Content of Tab Panel 1
      </div>
    </div>
    <div class="tabs-maxwidth__row">
      <span class="tabs-maxwidth__label">不限制最大宽度（避免）</span>
      <Tabs v-model="stretched" variant="card" :label-max-width="2000" overflow="none">
        <Tab value="a">This month's personal news and operation records</Tab>
        <Tab value="b">This is a long tab</Tab>
      </Tabs>
      <div class="tabs-maxwidth__panel">
        Content of Tab Panel 1
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs-maxwidth {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
}

.tabs-maxwidth__row {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0;
}

.tabs-maxwidth__label {
  margin-bottom: 10px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.tabs-maxwidth__panel {
  box-sizing: border-box;
  min-height: 120px;
  padding: 28px 16px;
  border: 1px solid var(--ud-color-border-card);
  border-top: 0;
  background: var(--ud-color-bg-white);
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
  text-align: center;
}

.tabs-maxwidth :deep(.ud-tooltip) {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
