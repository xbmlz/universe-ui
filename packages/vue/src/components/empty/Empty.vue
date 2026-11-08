<script setup lang="ts">
import type { EmptySize, EmptyVariant } from './types'
import { computed } from 'vue'

/*
 * Written spec: web illustrations are 150 / 120 / 60 px, the description is capped
 * at 250 px (200% of the 120 px illustration), buttons sit on one row and wrap only
 * when they no longer fit. Gaps and type sizes below 24 px are not stated by the spec.
 *
 * The client ships brand illustrations as assets, so none are bundled here. `image`
 * or the `image` slot takes the real artwork; the fallback glyph is an inferred
 * outline drawn to the same box.
 */
const {
  image,
  imageSize,
  variant = 'default',
  reverse = false,
  title,
  subtitle,
  description,
} = defineProps<{
  image?: string
  imageSize?: EmptySize | number
  variant?: EmptyVariant
  /** Put the illustration after the copy in the initialisation layout. */
  reverse?: boolean
  title?: string
  subtitle?: string
  description?: string
}>()

const sizes: Record<EmptySize, string> = {
  sm: '60px',
  md: '120px',
  lg: '150px',
}

const box = computed(() => {
  const value = typeof imageSize === 'number'
    ? `${imageSize}px`
    : imageSize
      ? sizes[imageSize]
      : variant === 'initial'
        ? '350px'
        : sizes.md
  return { '--ud-empty-image-size': value }
})
</script>

<template>
  <div
    class="ud-empty"
    :class="{
      'ud-empty--initial': variant === 'initial',
      'ud-empty--reverse': variant === 'initial' && reverse,
    }"
    :style="box"
  >
    <div class="ud-empty__image">
      <slot name="image">
        <img
          v-if="image"
          :src="image"
          alt=""
        >
        <svg
          v-else
          class="ud-empty__glyph"
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
          >
            <rect
              x="28"
              y="36"
              width="64"
              height="48"
              rx="6"
            />
            <path d="M28 58h18l4 8h20l4-8h18" />
          </g>
        </svg>
      </slot>
    </div>
    <div class="ud-empty__copy">
      <div
        v-if="title || $slots.title"
        class="ud-empty__title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="subtitle || $slots.subtitle"
        class="ud-empty__subtitle"
      >
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </div>
      <div
        v-if="description || $slots.description"
        class="ud-empty__description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>
      <div
        v-if="$slots.actions"
        class="ud-empty__actions"
      >
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
