<script setup lang="ts">
import { Tag } from '@universe-ui/vue'
import { ref } from 'vue'

const tags = ref(['前端', '后端', '设计'])

function remove(index: number) {
  tags.value.splice(index, 1)
}
</script>

<template>
  <div class="ud-demo-row">
    <Tag
      v-for="(tag, index) in tags"
      :key="tag"
      variant="option"
      closable
      @close="remove(index)"
    >
      {{ tag }}
    </Tag>
    <Tag variant="option" disabled>禁用</Tag>
  </div>
</template>
