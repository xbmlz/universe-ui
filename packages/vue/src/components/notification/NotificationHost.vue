<script setup lang="ts">
import { computed } from 'vue'
import NotificationItem from './NotificationItem.vue'
import { config, entries } from './store'

const style = computed(() => ({ top: `${config.value.top}px`, right: `${config.value.right}px` }))
</script>

<template>
  <TransitionGroup
    name="ud-notification"
    tag="div"
    class="ud-notification-host"
    :style="style"
  >
    <div
      v-for="entry in entries"
      :key="entry.id"
      class="ud-notification-host__item"
    >
      <NotificationItem :entry="entry" />
    </div>
  </TransitionGroup>
</template>
