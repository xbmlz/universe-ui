<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const active = ref('tab1')
const labels = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6', 'Tab 7', 'Tab 8']
</script>

<template>
  <div class="tabs-more">
    <div class="tabs-more__frame">
      <Tabs v-model="active" divider overflow="more">
        <Tab
          v-for="(label, index) in labels"
          :key="label"
          :value="`tab${index + 1}`"
        >
          {{ label }}
        </Tab>
      </Tabs>
    </div>
    <p class="tabs-more__note">
      当前选中：{{ active }}。放不下的标签收进右侧「更多」；从菜单里选中末尾标签时，它会临时替换到可见行末尾。
    </p>
  </div>
</template>

<style scoped>
.tabs-more {
  width: 100%;
}

.tabs-more__frame {
  width: 100%;
  max-width: 320px;
  padding: 24px 0 0;
}

.tabs-more__note {
  margin: 16px 0 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body);
}
</style>
