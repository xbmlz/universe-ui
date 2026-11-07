<script setup lang="ts">
import type { PlaceholderType } from './types'
import { computed, useId } from 'vue'

/*
 * The glyphs are approximated from the placeholder figures. The written spec
 * gives only the size (36px default) and N400; the outline geometry is inferred.
 */
const {
  type = 'default',
  size = 36,
} = defineProps<{
  type?: PlaceholderType
  size?: number | string
}>()

const uid = useId()
const broken = computed(() => type === 'failure')
const cracked = computed(() => `url(#${uid}-crack)`)
const inner = computed(() => `url(#${uid}-inner)`)

const box = computed(() => ({
  width: resolve(size),
  height: resolve(size),
}))
function resolve(value: number | string) {
  return typeof value === 'number'
    ? `${value}px`
    : value
}
</script>

<template>
  <svg
    class="ud-placeholder"
    :style="box"
    viewBox="0 0 36 36"
    aria-hidden="true"
  >
    <defs>
      <clipPath :id="`${uid}-inner`">
        <rect
          x="6"
          y="6"
          width="24"
          height="24"
          rx="2.5"
        />
      </clipPath>
      <mask
        v-if="broken"
        :id="`${uid}-crack`"
      >
        <rect
          x="-2"
          y="-2"
          width="40"
          height="40"
          fill="#fff"
        />
        <path
          d="M16.8 -2 L19 12 L16.5 18 L20.6 38"
          stroke="#000"
          stroke-width="2.6"
          fill="none"
        />
      </mask>
    </defs>
    <g
      fill="currentColor"
      :mask="broken ? cracked : undefined"
    >
      <!-- Ring: 30x30 outer radius 4, 24x24 inner radius 2.5, 3px wall. -->
      <path
        fill-rule="evenodd"
        d="M7 3 H29 A4 4 0 0 1 33 7 V29 A4 4 0 0 1 29 33 H7 A4 4 0 0 1 3 29 V7 A4 4 0 0 1 7 3 Z M8.5 6 H27.5 A2.5 2.5 0 0 1 30 8.5 V27.5 A2.5 2.5 0 0 1 27.5 30 H8.5 A2.5 2.5 0 0 1 6 27.5 V8.5 A2.5 2.5 0 0 1 8.5 6 Z"
      />
      <rect
        x="21"
        y="9"
        width="5"
        height="5"
        rx="1"
      />
      <g :clip-path="inner">
        <path d="M6 30 V22.5 L13.5 15.5 L20 22 L23.5 19 L30 24 V30 Z" />
      </g>
    </g>
  </svg>
</template>
