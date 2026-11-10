<script setup lang="ts">
import { Rate } from '@universe-ui/vue'
import { Heart, ThumbsUp } from '@icon-park/vue-next'
import { ref } from 'vue'

const hearts = ref(3)
const thumbs = ref(3)
const stars = ref(3)
</script>

<template>
  <div class="ud-demo-stack">
    <div class="rate-row">
      <span class="rate-label">心形</span>
      <Rate
        v-model="hearts"
        :icon="Heart"
        style="--ud-rate-active: #f54a45"
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">点赞</span>
      <Rate
        v-model="thumbs"
        :icon="ThumbsUp"
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">自定义颜色</span>
      <Rate
        v-model="stars"
        style="--ud-rate-active: var(--ud-color-brand)"
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
