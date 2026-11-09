<script setup lang="ts">
import type { ConsoleLog } from '../repl/console'

defineProps<{ logs: ConsoleLog[] }>()
const emit = defineEmits<{ clear: [] }>()
</script>

<template>
  <section
    class="console-panel"
    aria-label="Console"
  >
    <header class="console-panel__header">
      <strong>Console</strong>
      <button
        type="button"
        class="repl-button"
        @click="emit('clear')"
      >
        清空
      </button>
    </header>
    <div class="console-panel__body">
      <p
        v-if="!logs.length"
        class="console-panel__empty"
      >
        暂无输出
      </p>
      <p
        v-for="(log, index) in logs"
        :key="index"
        class="console-panel__line"
        :class="`console-panel__line--${log.level}`"
      >
        {{ log.text }}
      </p>
    </div>
  </section>
</template>
