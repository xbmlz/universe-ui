<script setup lang="ts">
import { Rate } from '@universe-ui/vue'
import { ref } from 'vue'

const empty = ref(0)
const half = ref(2.5)
const full = ref(5)
const custom = ref(3)
const customTexts = ['无法接受', '不满意', '一般', '满意', '非常满意']
</script>

<template>
  <div class="ud-demo-stack">
    <div class="rate-row">
      <span class="rate-label">未评分</span>
      <Rate
        v-model="empty"
        show-text
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">2.5 分</span>
      <Rate
        v-model="half"
        allow-half
        show-text
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">5 分</span>
      <Rate
        v-model="full"
        show-text
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">自定义</span>
      <Rate
        v-model="custom"
        show-text
        :texts="customTexts"
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
