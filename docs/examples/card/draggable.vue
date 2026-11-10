<script setup lang="ts">
import { Card } from '@universe-ui/vue'
import { ref } from 'vue'

const items = ref([
  { id: 1, name: '需求评审', owner: '张宁' },
  { id: 2, name: '设计稿确认', owner: '李彦' },
  { id: 3, name: '开发联调', owner: '王珂' },
  { id: 4, name: '灰度发布', owner: '陈默' },
])

const dragIndex = ref(-1)
const overIndex = ref(-1)

function onDragStart(index: number) {
  dragIndex.value = index
}

function onDragEnd() {
  dragIndex.value = -1
  overIndex.value = -1
}

function onDrop(index: number) {
  const from = dragIndex.value
  if (from === -1 || from === index) {
    onDragEnd()
    return
  }
  const next = [...items.value]
  const [moved] = next.splice(from, 1)
  next.splice(index, 0, moved)
  items.value = next
  onDragEnd()
}
</script>

<template>
  <div class="drag-list">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="drag-list__slot"
      :class="{ 'is-over': overIndex === index && dragIndex !== index }"
      @dragover.prevent="overIndex = index"
      @dragleave="overIndex = -1"
      @drop="onDrop(index)"
    >
      <Card
        :title="item.name"
        :subtitle="`负责人 ${item.owner}`"
        hoverable
        draggable
        :dragging="dragIndex === index"
        @dragstart="onDragStart(index)"
        @dragend="onDragEnd"
      />
    </div>
  </div>
</template>

<style scoped>
.drag-list {
  display: flex;
  width: 100%;
  max-width: 360px;
  flex-direction: column;
  gap: 16px;
}

.drag-list__slot {
  border-radius: var(--ud-radius-s);
  transition: outline-color 0.15s ease;
  outline: 1px dashed transparent;
  outline-offset: 4px;
}

.drag-list__slot.is-over {
  outline-color: var(--ud-color-brand);
}
</style>
