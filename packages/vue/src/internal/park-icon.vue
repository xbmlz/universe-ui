<script setup lang="ts">
import type { Component } from 'vue'
import { createVNode, onBeforeUnmount, onMounted, render, useTemplateRef, watch } from 'vue'

const {
  icon,
  theme = 'outline',
  size = '1em',
  fill = 'currentColor',
} = defineProps<{
  icon: Component
  theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color'
  size?: number | string
  fill?: string
}>()

const host = useTemplateRef<HTMLElement>('host')

function paint() {
  const el = host.value
  if (!el)
    return
  render(createVNode(icon, { theme, size, fill }), el)
}

onMounted(paint)
watch(() => [icon, theme, size, fill], paint)

onBeforeUnmount(() => {
  if (host.value)
    render(null, host.value)
})
</script>

<template>
  <span
    ref="host"
    class="ud-park"
  />
</template>

<style>
.ud-park {
  display: inline-flex;
  color: inherit;
  line-height: 0;
}
</style>
