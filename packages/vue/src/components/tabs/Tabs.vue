<script setup lang="ts">
import type { TabsSize, TabsVariant, TabValue } from './types'
import { computed, provide } from 'vue'
import { TABS } from './context'

const {
  variant = 'line',
  size = 'md',
  divider = false,
} = defineProps<{
  variant?: TabsVariant
  size?: TabsSize
  divider?: boolean
}>()

const model = defineModel<TabValue | null>({ default: null })

const resolvedSize = computed(() => (variant === 'capsule' && size === 'lg'
  ? 'md'
  : size))

provide(TABS, { model })

function onKeydown(event: KeyboardEvent) {
  const keys = [
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
  ]
  if (!keys.includes(event.key))
    return
  const list = event.currentTarget as HTMLElement
  const tabs = [
    ...list.querySelectorAll<HTMLButtonElement>('.ud-tab:not(:disabled)'),
  ]
  if (!tabs.length)
    return
  const index = tabs.indexOf(document.activeElement as HTMLButtonElement)
  let next = index
  if (event.key === 'ArrowRight')
    next = (index + 1) % tabs.length
  if (event.key === 'ArrowLeft')
    next = (index - 1 + tabs.length) % tabs.length
  if (event.key === 'Home')
    next = 0
  if (event.key === 'End')
    next = tabs.length - 1
  event.preventDefault()
  tabs[next].focus()
  tabs[next].click()
}
</script>

<template>
  <div
    class="ud-tabs"
    :class="[
      `ud-tabs--${variant}`,
      `ud-tabs--${resolvedSize}`,
      { 'ud-tabs--divider': divider && variant === 'line' },
    ]"
    role="tablist"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
