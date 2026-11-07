<script setup lang="ts">
import { computed } from 'vue'
import { config, entries } from './store'
import ToastItem from './ToastItem.vue'

const style = computed(() => ({ top: `${config.value.top}px` }))
</script>

<template>
  <TransitionGroup
    name="ud-toast"
    tag="div"
    class="ud-toast-host"
    :style="style"
  >
    <div
      v-for="entry in entries"
      :key="entry.id"
      class="ud-toast-host__item"
    >
      <ToastItem :entry="entry" />
    </div>
  </TransitionGroup>
</template>
