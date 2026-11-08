<script setup lang="ts">
import type { AnchorItem } from './types'
import { useEventListener } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'

/*
 * Specified in anchor.md: titles are 14px, the column is 200px wide and never wider
 * than 400px, it keeps at least 24px from other elements, the selected state is
 * marked by a locator line, and the list scrolls and sticks to the viewport. The
 * active entry is the last section whose top has passed the offset.
 */
const {
  items,
  offset = 0,
  affix = true,
  loading = false,
  failed = false,
  marker = true,
  container,
} = defineProps<{
  items: AnchorItem[]
  offset?: number
  affix?: boolean
  loading?: boolean
  /** The contents could not be loaded; exposes a retry action. */
  failed?: boolean
  marker?: boolean
  /** A scroll container by element or selector; omit to follow the page. */
  container?: string | HTMLElement
}>()

const emit = defineEmits<{ retry: [] }>()

const active = shallowRef('')
const windowTarget = shallowRef<Window | null>(null)
onMounted(() => {
  windowTarget.value = window
  update()
})

const flat = computed(() => {
  const walk = (list: AnchorItem[], depth = 0): (AnchorItem & { depth: number })[] => list.flatMap(item => [
    { ...item, depth },
    ...walk(item.children ?? [], depth + 1),
  ])
  return walk(items)
})

function resolveContainer(): HTMLElement | null {
  if (!container)
    return null
  return typeof container === 'string'
    ? document.querySelector<HTMLElement>(container)
    : container
}

function sectionTop(key: string): number | null {
  const element = document.getElementById(key)
  if (!element)
    return null
  const box = resolveContainer()
  if (box) {
    const containerRect = box.getBoundingClientRect()
    return element.getBoundingClientRect().top - containerRect.top + box.scrollTop
  }
  return element.getBoundingClientRect().top + window.scrollY
}

function update() {
  const box = resolveContainer()
  const travelled = box ? box.scrollTop : window.scrollY
  const line = travelled + offset
  let current = flat.value[0]?.key ?? ''
  for (const item of flat.value) {
    const top = sectionTop(item.key)
    if (top != null && top <= line)
      current = item.key
  }
  active.value = current
}

useEventListener(windowTarget, 'scroll', update, { capture: true, passive: true })
useEventListener(windowTarget, 'resize', update)

onMounted(() => {
  const box = resolveContainer()
  if (box) {
    box.addEventListener('scroll', update, { passive: true })
  }
})

onBeforeUnmount(() => {
  const box = resolveContainer()
  if (box)
    box.removeEventListener('scroll', update)
})

function go(key: string) {
  const element = document.getElementById(key)
  if (!element)
    return
  const box = resolveContainer()
  if (box) {
    const containerRect = box.getBoundingClientRect()
    const top = element.getBoundingClientRect().top - containerRect.top + box.scrollTop - offset
    box.scrollTo({ top, behavior: 'smooth' })
  }
  else {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth',
    })
  }
  active.value = key
}
</script>

<template>
  <nav
    class="ud-anchor"
    :class="{ 'ud-anchor--affix': affix, 'ud-anchor--marker': marker }"
  >
    <div
      v-if="loading && !failed"
      class="ud-anchor__loading"
    >
      <span
        class="ud-anchor__spinner"
        aria-hidden="true"
      />
      <span>加载中</span>
    </div>
    <div
      v-else-if="failed"
      class="ud-anchor__failure"
      role="alert"
    >
      <span>加载失败</span>
      <button
        type="button"
        class="ud-anchor__retry"
        @click="emit('retry')"
      >
        重试
      </button>
    </div>
    <ul
      v-else
      class="ud-anchor__list"
    >
      <li
        v-for="item in flat"
        :key="item.key"
        class="ud-anchor__group"
      >
        <button
          type="button"
          class="ud-anchor__link"
          :class="{ 'ud-anchor__link--sub': item.depth > 0, 'is-active': active === item.key }"
          :style="{ '--ud-anchor-depth': item.depth }"
          :aria-current="active === item.key ? 'true' : undefined"
          @click="go(item.key)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>
