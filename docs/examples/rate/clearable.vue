<script setup lang="ts">
import { Rate } from '@universe-ui/vue'
import { ref } from 'vue'

const clearable = ref(3)
const locked = ref(3)
</script>

<template>
  <div class="ud-demo-stack">
    <div class="rate-row">
      <span class="rate-label">可清除</span>
      <Rate
        v-model="clearable"
        show-text
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">禁止清除</span>
      <Rate
        v-model="locked"
        :clearable="false"
        show-text
      />
    </div>
  </div>
</template>

<style scoped>
.rate-row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.rate-label {
  width: 80px;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  white-space: nowrap;
  /* The label lines up with the 32px star row, not with the hint under it. */
  line-height: 32px;
}
</style>
