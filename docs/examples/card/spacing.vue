<script setup lang="ts">
import { Card } from '@universe-ui/vue'
</script>

<template>
  <div class="spacing-demo">
    <div class="spacing-demo__group">
      <Card
        v-for="n in 2"
        :key="n"
        :title="`描边卡片 ${n}`"
        :shadow="'none'"
      >
        <p class="spacing-text">不带投影时，卡片间距 12 px。</p>
      </Card>
      <span class="spacing-demo__label">无投影 · gap 12px</span>
    </div>
    <div class="spacing-demo__group spacing-demo__group--shadow">
      <Card
        v-for="n in 2"
        :key="n"
        :title="`投影卡片 ${n}`"
        shadow="s1"
        :border="false"
      >
        <p class="spacing-text">带投影时，投影需要更多空间，间距 16 px。</p>
      </Card>
      <span class="spacing-demo__label">有投影 · gap 16px</span>
    </div>
  </div>
</template>

<style scoped>
.spacing-demo {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.spacing-demo__group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.spacing-demo__group--shadow {
  gap: 16px;
}

.spacing-demo__label {
  margin-top: auto;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.spacing-text {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}
</style>
