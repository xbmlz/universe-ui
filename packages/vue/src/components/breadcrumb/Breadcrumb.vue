<script setup lang="ts">
import type { BreadcrumbItem } from './types'
import { Right } from '@icon-park/vue-next'
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, useId, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { nextLayerZ } from '../dialog/scroll-lock'
import Tooltip from '../tooltip/Tooltip.vue'

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

const emit = defineEmits<{
  select: [index: number]
}>()

const rootRef = useTemplateRef<HTMLElement>('root')
const trayId = useId()
const hiddenCount = shallowRef(0)
const trayOpen = shallowRef(false)
const trayStyle = shallowRef<Record<string, string>>({})

let timer = 0
let layer = 0
let generation = 0
let observer: ResizeObserver | undefined

const hidden = computed(() => {
  const count = Math.min(hiddenCount.value, Math.max(0, props.items.length - 2))
  return props.items.slice(1, 1 + count)
})

const visible = computed(() => {
  const count = hidden.value.length
  if (count === 0)
    return props.items.map((item, index) => ({ item, index }))
  const first = props.items[0]
  if (!first)
    return []
  const tail = props.items.slice(1 + count).map((item, offset) => ({
    item,
    index: offset + 1 + count,
  }))
  return [
    { item: first, index: 0 },
    ...tail,
  ]
})

function choose(event: MouseEvent, index: number) {
  emit('select', index)
  const item = props.items[index]
  if (!item?.href)
    event.preventDefault()
  trayOpen.value = false
}

async function fit() {
  const root = rootRef.value
  if (!root)
    return
  const gen = ++generation
  hiddenCount.value = 0
  await nextTick()
  if (gen !== generation)
    return
  const max = Math.max(0, props.items.length - 2)
  let count = 0
  while (count < max && root.scrollWidth > root.clientWidth + 1) {
    count += 1
    hiddenCount.value = count
    await nextTick()
    if (gen !== generation)
      return
  }
}

function place() {
  const more = rootRef.value?.querySelector<HTMLElement>('.ud-breadcrumb__more')
  const tray = document.querySelector<HTMLElement>(`[data-breadcrumb-tray="${CSS.escape(trayId)}"]`)
  if (!more || !tray)
    return
  const rect = more.getBoundingClientRect()
  const width = tray.offsetWidth
  const left = Math.min(Math.max(16, rect.left), Math.max(16, window.innerWidth - width - 16))
  trayStyle.value = {
    top: `${rect.bottom + 8}px`,
    left: `${left}px`,
    zIndex: String(layer),
  }
}

function showTray() {
  window.clearTimeout(timer)
  layer = nextLayerZ()
  trayOpen.value = true
  nextTick(place)
}

function hideTray() {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    trayOpen.value = false
  }, 100)
}

onMounted(() => {
  observer = new ResizeObserver(() => {
    fit()
  })
  if (rootRef.value)
    observer.observe(rootRef.value)
  fit()
})

watch(() => props.items, () => fit(), { deep: true })

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  observer?.disconnect()
})
</script>

<template>
  <nav
    ref="root"
    class="ud-breadcrumb"
    aria-label="面包屑"
  >
    <ol class="ud-breadcrumb__list">
      <template
        v-for="(entry, position) in visible"
        :key="entry.index"
      >
        <li
          v-if="position === 1 && hidden.length"
          class="ud-breadcrumb__item"
        >
          <button
            type="button"
            class="ud-breadcrumb__more"
            aria-label="展开隐藏层级"
            @pointerenter="showTray"
            @pointerleave="hideTray"
          >
            …
          </button>
          <span
            class="ud-breadcrumb__sep"
            aria-hidden="true"
          >
            <ParkIcon :icon="Right" />
          </span>
          <Teleport to="body">
            <Transition name="ud-breadcrumb">
              <div
                v-if="trayOpen"
                class="ud-breadcrumb__tray"
                :data-breadcrumb-tray="trayId"
                :style="trayStyle"
                @pointerenter="showTray"
                @pointerleave="hideTray"
              >
                <template
                  v-for="(item, index) in hidden"
                  :key="`${item.label}-${index}`"
                >
                  <a
                    v-if="item.href"
                    class="ud-breadcrumb__link"
                    :href="item.href"
                    @click="choose($event, index + 1)"
                  >
                    <span class="ud-breadcrumb__label">{{ item.label }}</span>
                  </a>
                  <button
                    v-else
                    type="button"
                    class="ud-breadcrumb__link"
                    @click="choose($event, index + 1)"
                  >
                    <span class="ud-breadcrumb__label">{{ item.label }}</span>
                  </button>
                  <span
                    v-if="index < hidden.length - 1"
                    class="ud-breadcrumb__sep"
                    aria-hidden="true"
                  >
                    <ParkIcon :icon="Right" />
                  </span>
                </template>
              </div>
            </Transition>
          </Teleport>
        </li>
        <li class="ud-breadcrumb__item">
          <span
            v-if="entry.index === items.length - 1"
            class="ud-breadcrumb__current"
            aria-current="page"
          >
            <Tooltip
              :content="entry.item.label"
              only-overflow
            >
              <span class="ud-breadcrumb__label">{{ entry.item.label }}</span>
            </Tooltip>
          </span>
          <a
            v-else-if="entry.item.href"
            class="ud-breadcrumb__link"
            :href="entry.item.href"
            @click="choose($event, entry.index)"
          >
            <Tooltip
              :content="entry.item.label"
              only-overflow
            >
              <span class="ud-breadcrumb__label">{{ entry.item.label }}</span>
            </Tooltip>
          </a>
          <button
            v-else
            type="button"
            class="ud-breadcrumb__link"
            @click="choose($event, entry.index)"
          >
            <Tooltip
              :content="entry.item.label"
              only-overflow
            >
              <span class="ud-breadcrumb__label">{{ entry.item.label }}</span>
            </Tooltip>
          </button>
          <span
            v-if="entry.index !== items.length - 1"
            class="ud-breadcrumb__sep"
            aria-hidden="true"
          >
            <ParkIcon :icon="Right" />
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
