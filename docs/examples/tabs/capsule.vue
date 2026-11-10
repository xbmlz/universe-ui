<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const medium = ref('1')
const small = ref('1')
</script>

<template>
  <div class="tabs-capsule">
    <div class="tabs-capsule__states">
      <div class="tabs-capsule__cell">
        <Tabs model-value="other" variant="capsule" overflow="none">
          <Tab value="tab">Tabs</Tab>
        </Tabs>
        <span class="tabs-capsule__caption">Normal</span>
      </div>
      <div class="tabs-capsule__cell">
        <Tabs model-value="tab" variant="capsule" overflow="none">
          <Tab value="tab">Tabs</Tab>
        </Tabs>
        <span class="tabs-capsule__caption">Selected</span>
      </div>
      <div class="tabs-capsule__cell">
        <Tabs model-value="other" variant="capsule" overflow="none">
          <Tab value="tab" disabled>Tabs</Tab>
        </Tabs>
        <span class="tabs-capsule__caption">Disabled</span>
      </div>
      <div class="tabs-capsule__cell tabs-capsule__cell--hover">
        <Tabs model-value="other" variant="capsule" overflow="none">
          <Tab value="tab">Tabs</Tab>
        </Tabs>
        <span class="tabs-capsule__caption">Hover</span>
      </div>
    </div>
    <div class="tabs-capsule__row">
      <span class="tabs-capsule__label">Medium（配图写作 Media）</span>
      <Tabs v-model="medium" variant="capsule" overflow="none">
        <Tab v-for="n in 6" :key="n" :value="String(n)">Tab {{ n }}</Tab>
      </Tabs>
    </div>
    <div class="tabs-capsule__row">
      <span class="tabs-capsule__label">Small</span>
      <Tabs v-model="small" variant="capsule" size="sm" overflow="none">
        <Tab v-for="n in 6" :key="n" :value="String(n)">Tab {{ n }}</Tab>
      </Tabs>
    </div>
  </div>
</template>

<style scoped>
.tabs-capsule {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
}

.tabs-capsule__states {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.tabs-capsule__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.tabs-capsule__cell :deep(.ud-tabs),
.tabs-capsule__cell :deep(.ud-tabs__viewport) {
  justify-content: center;
}

/* State figure: hover keeps the grey fill and turns the label blue. */
.tabs-capsule__cell--hover :deep(.ud-tab) {
  color: var(--ud-color-brand);
}

.tabs-capsule__caption {
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
}

.tabs-capsule__row {
  display: flex;
  align-items: center;
  gap: 24px;
  min-width: 0;
}

.tabs-capsule__label {
  flex: none;
  width: 168px;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
}
</style>
