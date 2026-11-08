<script setup lang="ts">
import { computed } from 'vue'
import { config, entries } from './store'
import ToastItem from './ToastItem.vue'

const style = computed(() => ({ top: `${config.value.top}px` }))
const target = computed(() => config.value.container ?? 'body')
</script>

<template>
  <Teleport
    :to="target"
    :disabled="!config.value.container"
  >
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
  </Teleport>
</template>
