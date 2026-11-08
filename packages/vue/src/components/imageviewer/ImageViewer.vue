<script setup lang="ts">
import type { ImageViewerImage } from './types'
import { Close, Download, Left, Right, Rotate, ZoomIn, ZoomOut } from '@icon-park/vue-next'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { lockScroll, unlockScroll } from '../dialog/scroll-lock'

/*
 * Specified in imageviewer.md: an 80% black mask covers the window, the toolbar is
 * split into navigation, zoom and extra groups, zoom steps by 10% of the current
 * image, the fit button toggles between fitting the window and 1:1, the flip turns
 * counter-clockwise, and the keys are arrows, up/down zoom and Escape. The exact
 * toolbar metrics are inferred.
 */
const {
  images,
  downloadable = true,
  rotate = true,
  label = '图片预览',
  total,
  hasPrevious,
  hasNext,
} = defineProps<{
  images: (ImageViewerImage | string)[]
  downloadable?: boolean
  rotate?: boolean
  label?: string
  /** Set to null when the collection size is unknown; the count is then hidden. */
  total?: number | null
  hasPrevious?: boolean
  hasNext?: boolean
}>()

const visible = defineModel<boolean>({ default: false })
const current = defineModel<number>('index', { default: 0 })

const normalized = computed<ImageViewerImage[]>(() => images.map(image => (typeof image === 'string'
  ? { src: image }
  : image)))
const currentImage = computed(() => normalized.value[current.value] ?? normalized.value[0])
const count = computed(() => total ?? normalized.value.length)
const knownTotal = computed(() => total !== null)
const previousDisabled = computed(() => hasPrevious === undefined
  ? current.value <= 0
  : !hasPrevious)
const nextDisabled = computed(() => hasNext === undefined
  ? current.value >= count.value - 1
  : !hasNext)

const windowTarget = shallowRef<Window | null>(null)
const imgRef = useTemplateRef<HTMLImageElement>('image')
const scale = shallowRef(1)
const rotation = shallowRef(0)
const fitted = shallowRef(true)
const natural = shallowRef({ width: 0, height: 0 })
const pan = shallowRef({ x: 0, y: 0 })
const panning = shallowRef(false)
let panOrigin = { x: 0, y: 0, pointerX: 0, pointerY: 0 }

onMounted(() => {
  windowTarget.value = window
})

function fitScale() {
  if (!natural.value.width || !natural.value.height)
    return 1
  const width = window.innerWidth - 128
  const height = window.innerHeight - 160
  return Math.min(1, width / natural.value.width, height / natural.value.height)
}

function applyFit() {
  scale.value = fitScale()
  fitted.value = true
  pan.value = { x: 0, y: 0 }
}

function onLoad() {
  const image = imgRef.value
  if (!image)
    return
  natural.value = {
    width: image.naturalWidth,
    height: image.naturalHeight,
  }
  if (fitted.value)
    applyFit()
}

function zoomBy(factor: number) {
  const fit = fitScale()
  scale.value = Math.min(8, Math.max(0.1, (fitted.value ? fit : scale.value) * factor))
  fitted.value = false
}

function zoomIn() {
  zoomBy(1.1)
}

function zoomOut() {
  zoomBy(1 / 1.1)
}

function toggleFit() {
  if (fitted.value) {
    scale.value = 1
    fitted.value = false
    return
  }
  applyFit()
}

const canPan = computed(() => !fitted.value && scale.value > fitScale() * 1.01)

function startPan(event: PointerEvent) {
  if (!canPan.value || event.button !== 0)
    return
  event.preventDefault()
  panning.value = true
  panOrigin = {
    x: pan.value.x,
    y: pan.value.y,
    pointerX: event.clientX,
    pointerY: event.clientY,
  }
}

function movePan(event: PointerEvent) {
  if (!panning.value)
    return
  pan.value = {
    x: panOrigin.x + event.clientX - panOrigin.pointerX,
    y: panOrigin.y + event.clientY - panOrigin.pointerY,
  }
}

function stopPan() {
  panning.value = false
}

function turn() {
  rotation.value -= 90
}

function previous() {
  if (previousDisabled.value)
    return
  current.value -= 1
}

function next() {
  if (nextDisabled.value)
    return
  current.value += 1
}

function download() {
  const image = currentImage.value
  if (!image)
    return
  const anchor = document.createElement('a')
  anchor.href = image.src
  anchor.download = image.alt ?? ''
  anchor.click()
}

function close() {
  visible.value = false
}

function onKey(event: KeyboardEvent) {
  if (!visible.value)
    return
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previous()
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    zoomIn()
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    zoomOut()
  }
}

function onWheel(event: WheelEvent) {
  if (!visible.value || !(event.metaKey || event.ctrlKey))
    return
  event.preventDefault()
  if (event.deltaY < 0)
    zoomIn()
  else
    zoomOut()
}

useEventListener(windowTarget, 'keydown', onKey)
useEventListener(windowTarget, 'wheel', onWheel, { passive: false })
useEventListener(windowTarget, 'pointermove', movePan)
useEventListener(windowTarget, 'pointerup', stopPan)
useEventListener(windowTarget, 'pointercancel', stopPan)

watch(visible, (value) => {
  if (value) {
    lockScroll()
    scale.value = 1
    rotation.value = 0
    fitted.value = true
    pan.value = { x: 0, y: 0 }
    nextTick(applyFit)
    return
  }
  unlockScroll()
})

watch(current, () => {
  scale.value = 1
  rotation.value = 0
  fitted.value = true
  pan.value = { x: 0, y: 0 }
  natural.value = { width: 0, height: 0 }
})

onBeforeUnmount(() => {
  if (visible.value)
    unlockScroll()
})

const imageStyle = computed(() => ({
  transform: `translate(-50%, -50%) translate(${pan.value.x}px, ${pan.value.y}px) rotate(${rotation.value}deg) scale(${scale.value})`,
}))

const scaleText = computed(() => `${Math.round(scale.value * 100)}%`)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="ud-imageviewer"
      role="dialog"
      aria-modal="true"
      :aria-label="label"
      @click.self="close"
    >
      <div
        class="ud-imageviewer__stage"
        :class="{ 'is-pannable': canPan, 'is-panning': panning }"
        @click.self="close"
        @pointerdown="startPan"
      >
        <img
          v-if="currentImage"
          ref="image"
          class="ud-imageviewer__image"
          :src="currentImage.src"
          :alt="currentImage.alt ?? ''"
          :style="imageStyle"
          @load="onLoad"
        >
        <span
          v-else
          class="ud-imageviewer__placeholder"
        >暂无图片</span>
      </div>
      <div class="ud-imageviewer__toolbar">
        <div class="ud-imageviewer__group">
          <button
            type="button"
            class="ud-imageviewer__button"
            aria-label="上一张"
            :disabled="previousDisabled"
            @click="previous"
          >
            <ParkIcon :icon="Left" />
          </button>
          <span
            v-if="knownTotal"
            class="ud-imageviewer__count"
          >{{ current + 1 }} / {{ count }}</span>
          <button
            type="button"
            class="ud-imageviewer__button"
            aria-label="下一张"
            :disabled="nextDisabled"
            @click="next"
          >
            <ParkIcon :icon="Right" />
          </button>
        </div>
        <span class="ud-imageviewer__divider" />
        <div class="ud-imageviewer__group">
          <button
            type="button"
            class="ud-imageviewer__button"
            aria-label="缩小"
            @click="zoomOut"
          >
            <ParkIcon :icon="ZoomOut" />
          </button>
          <span class="ud-imageviewer__count">{{ scaleText }}</span>
          <button
            type="button"
            class="ud-imageviewer__button"
            aria-label="放大"
            @click="zoomIn"
          >
            <ParkIcon :icon="ZoomIn" />
          </button>
          <button
            type="button"
            class="ud-imageviewer__button"
            :aria-label="fitted ? '适配到窗口尺寸' : '展示 1:1 比例'"
            @click="toggleFit"
          >
            <span class="ud-imageviewer__fit">{{ fitted ? '1:1' : '适配' }}</span>
          </button>
        </div>
        <span class="ud-imageviewer__divider" />
        <div class="ud-imageviewer__group">
          <button
            v-if="rotate"
            type="button"
            class="ud-imageviewer__button"
            aria-label="逆时针旋转"
            @click="turn"
          >
            <ParkIcon :icon="Rotate" />
          </button>
          <button
            v-if="downloadable"
            type="button"
            class="ud-imageviewer__button"
            aria-label="下载"
            @click="download"
          >
            <ParkIcon :icon="Download" />
          </button>
          <slot name="actions" />
        </div>
        <button
          type="button"
          class="ud-imageviewer__button ud-imageviewer__close"
          aria-label="关闭"
          @click="close"
        >
          <ParkIcon :icon="Close" />
        </button>
      </div>
    </div>
  </Teleport>
</template>
