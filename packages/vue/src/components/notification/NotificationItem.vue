<script setup lang="ts">
import type { NotificationEntry } from './store'
import { onBeforeUnmount, watch } from 'vue'
import Notification from './Notification.vue'
import { remove } from './store'

const { entry } = defineProps<{ entry: NotificationEntry }>()

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
  <Notification
    :type="entry.type"
    :title="entry.title"
    :content="entry.content"
    :closable="entry.closable ?? true"
    :show-icon="entry.showIcon ?? true"
    :color="entry.color"
    :actions="entry.actions"
    @mouseenter="pause"
    @mouseleave="start"
    @close="remove(entry.id)"
  />
</template>
