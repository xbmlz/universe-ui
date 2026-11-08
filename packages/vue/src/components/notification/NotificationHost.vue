<script setup lang="ts">
import { computed } from 'vue'
import NotificationItem from './NotificationItem.vue'
import { config, entries } from './store'

const style = computed(() => ({ top: `${config.value.top}px`, right: `${config.value.right}px` }))
const target = computed(() => config.value.container ?? 'body')
</script>

<template>
  <Teleport
    :to="target"
    :disabled="!config.value.container"
  >
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
  </Teleport>
</template>
