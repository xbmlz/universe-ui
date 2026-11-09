<script setup lang="ts">
import type { AvatarColor, AvatarKind, AvatarNameLocale, AvatarShape } from './types'
import { ApplicationOne, BuildingOne, Peoples, User } from '@icon-park/vue-next'
import { computed, inject, onMounted, shallowRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { Tooltip } from '../tooltip'
import { AVATAR_GROUP } from './context'
import { fontRatio, groupLines, initials } from './text'

const {
  src,
  name = '',
  text,
  kind = 'person',
  shape,
  size,
  color = 'blue',
  nameLocale = 'auto',
} = defineProps<{
  src?: string
  name?: string
  text?: string
  kind?: AvatarKind
  shape?: AvatarShape
  size?: number
  color?: AvatarColor
  /** Use the Japanese surname rule when automatic script detection is not enough. */
  nameLocale?: AvatarNameLocale
}>()

const group = inject(AVATAR_GROUP, null)

const DEFAULT_ICONS = {
  person: User,
  group: Peoples,
  app: ApplicationOne,
  enterprise: BuildingOne,
}

const status = shallowRef<'idle' | 'loading' | 'loaded' | 'error'>('idle')
const imageRef = shallowRef<HTMLImageElement | null>(null)
watch(() => src, (value) => {
  status.value = value ? 'loading' : 'idle'
}, { immediate: true })

// A cached image can finish loading before hydration attaches @load.
onMounted(() => {
  const image = imageRef.value
  if (!image?.complete)
    return
  status.value = image.naturalWidth > 0
    ? 'loaded'
    : 'error'
})

const resolvedSize = computed(() => size ?? group?.size() ?? 32)
const resolvedShape = computed(() => shape ?? (kind === 'app' || kind === 'enterprise'
  ? 'square'
  : 'circle'))
const showImage = computed(() => !!src && status.value !== 'error')
const label = computed(() => text ?? initials(name, kind, nameLocale))
const lines = computed(() => (kind === 'group'
  ? groupLines(label.value)
  : [label.value]))

const classes = computed(() => [
  'ud-avatar',
  `ud-avatar--${kind}`,
  `ud-avatar--${resolvedShape.value}`,
  `ud-avatar--${color}`,
  {
    'ud-avatar--image': showImage.value,
    'ud-avatar--loading': status.value === 'loading',
    'ud-avatar--multiline': lines.value.length > 1,
  },
])

const style = computed(() => ({
  '--ud-avatar-size': `${resolvedSize.value}px`,
  '--ud-avatar-font-ratio': String(fontRatio(label.value, kind)),
}))
</script>

<template>
  <Tooltip
    class="ud-avatar-tooltip"
    :content="name"
  >
    <span
      :class="classes"
      :style="style"
      :role="showImage ? undefined : 'img'"
      :aria-label="showImage ? undefined : name || label || undefined"
      :data-name="name || undefined"
    >
      <img
        v-if="showImage"
        ref="imageRef"
        class="ud-avatar__image"
        :src="src"
        :alt="name"
        @load="status = 'loaded'"
        @error="status = 'error'"
      >
      <span
        v-else-if="$slots.icon"
        class="ud-avatar__icon"
      ><slot name="icon" /></span>
      <span
        v-else-if="label"
        class="ud-avatar__text"
        aria-hidden="true"
      >
        <span
          v-for="(line, index) in lines"
          :key="index"
          class="ud-avatar__line"
        >{{ line }}</span>
      </span>
      <span
        v-else
        class="ud-avatar__icon"
      ><ParkIcon
        :icon="DEFAULT_ICONS[kind]"
        theme="filled"
      /></span>
    </span>
  </Tooltip>
</template>
