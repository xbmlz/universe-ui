<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const active = ref('tab1')
const labels = Array.from({ length: 12 }, (_, index) => `Tab ${index + 1}`)
</script>

<template>
  <div class="tabs-scroll">
    <Tabs v-model="active" overflow="scroll">
      <Tab
        v-for="(label, index) in labels"
        :key="label"
        :value="`tab${index + 1}`"
      >
        {{ label }}
      </Tab>
    </Tabs>
  </div>
</template>

<style scoped>
.tabs-scroll {
  width: 100%;
  max-width: 640px;
}
</style>
