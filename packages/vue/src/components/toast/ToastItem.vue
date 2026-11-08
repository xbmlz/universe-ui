<script setup lang="ts">
import type { ToastEntry } from './store'
import { onBeforeUnmount, watch } from 'vue'
import { remove } from './store'
import Toast from './Toast.vue'

const { entry } = defineProps<{ entry: ToastEntry }>()

let timer: ReturnType<typeof setTimeout> | undefined

function start() {
  clearTimeout(timer)
  if (entry.duration > 0)
    timer = setTimeout(remove, entry.duration, entry.id)
}

function pause() {
  clearTimeout(timer)
}

watch(() => [entry.revision, entry.duration], start, { immediate: true })
onBeforeUnmount(pause)
</script>

<template>
  <Toast
    :type="entry.type"
    :closable="entry.closable"
    :actions="entry.actions"
    @mouseenter="pause"
    @mouseleave="start"
    @close="remove(entry.id)"
  >
    <component
      :is="entry.content"
      v-if="typeof entry.content !== 'string'"
    />
    <template v-else>
      {{ entry.content }}
    </template>
  </Toast>
</template>
