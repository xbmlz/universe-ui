<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const selected = ref('tab')
</script>

<template>
  <div class="tabs-states">
    <div class="tabs-states__grid">
      <div class="tabs-states__cell">
        <Tabs model-value="other" overflow="none">
          <Tab value="tab">Tab</Tab>
        </Tabs>
        <span class="tabs-states__label">Normal</span>
      </div>
      <div class="tabs-states__cell">
        <Tabs v-model="selected" overflow="none">
          <Tab value="tab">Tab</Tab>
        </Tabs>
        <span class="tabs-states__label">Selected</span>
      </div>
      <div class="tabs-states__cell">
        <Tabs model-value="other" overflow="none">
          <Tab value="tab" disabled>Tab</Tab>
        </Tabs>
        <span class="tabs-states__label">Disabled</span>
      </div>
      <div class="tabs-states__cell">
        <Tabs model-value="other" overflow="none">
          <Tab value="tab">Tab</Tab>
        </Tabs>
        <span class="tabs-states__label tabs-states__label--hint">Hover（移入上方标签）</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs-states {
  width: 100%;
}

.tabs-states__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 16px;
}

.tabs-states__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

/* The tab lives inside the viewport, not directly inside the root. */
.tabs-states__cell :deep(.ud-tabs),
.tabs-states__cell :deep(.ud-tabs__viewport) {
  justify-content: center;
}

.tabs-states__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  text-align: center;
}

.tabs-states__label--hint {
  font-size: var(--ud-font-size-caption);
}
</style>
