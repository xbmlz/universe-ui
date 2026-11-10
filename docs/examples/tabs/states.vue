<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const selected = ref('tab')
</script>

<template>
  <div class="tabs-states">
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
      <span class="tabs-states__label">Disable</span>
    </div>
    <div class="tabs-states__cell tabs-states__cell--hover">
      <Tabs model-value="other" overflow="none">
        <Tab value="tab">Tab</Tab>
      </Tabs>
      <span class="tabs-states__label">Hover</span>
    </div>
  </div>
</template>

<style scoped>
.tabs-states {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.tabs-states__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  min-width: 0;
}

.tabs-states__cell :deep(.ud-tabs),
.tabs-states__cell :deep(.ud-tabs__viewport) {
  justify-content: center;
}

/* State figure draws Hover as blue text with no indicator, in the same row as the other three. */
.tabs-states__cell--hover :deep(.ud-tab) {
  color: var(--ud-color-brand);
}

.tabs-states__label {
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  text-align: center;
}
</style>
