<script setup lang="ts">
import { More } from '@icon-park/vue-next'
import { computed, onBeforeUnmount, onMounted, provide, shallowRef, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { AVATAR_GROUP } from './context'

const { size = 32, max = 5 } = defineProps<{
  size?: number
  max?: number
}>()

const emit = defineEmits<{ more: [event: MouseEvent] }>()

provide(AVATAR_GROUP, {
  size: () => size,
})

const root = useTemplateRef<HTMLElement>('root')
const rest = shallowRef(0)

function layout() {
  const el = root.value
  if (!el)
    return
  const avatars = [
    ...el.querySelectorAll<HTMLElement>(':scope > .ud-avatar'),
  ]
  const shown = avatars.length <= max + 1
    ? avatars.length
    : max
  avatars.forEach((avatar, index) => {
    avatar.hidden = index >= shown
  })
  rest.value = avatars.length - shown
}

let observer: MutationObserver | undefined
onMounted(() => {
  layout()
  observer = new MutationObserver(layout)
  observer.observe(root.value!, { childList: true })
})
onBeforeUnmount(() => observer?.disconnect())
watch(() => max, layout)

const overflow = computed(() => rest.value > (size >= 32
  ? 999
  : 99))

const style = computed(() => ({ '--ud-avatar-size': `${size}px` }))
</script>

<template>
  <div
    ref="root"
    class="ud-avatar-group"
    :class="`ud-avatar-group--${size}`"
    :style="style"
  >
    <slot />
    <button
      v-if="rest > 0"
      type="button"
      class="ud-avatar-group__more"
      :aria-label="`还有 ${rest} 人`"
      @click="emit('more', $event)"
    >
      <ParkIcon
        v-if="overflow"
        :icon="More"
      />
      <template v-else>
        +{{ rest }}
      </template>
    </button>
  </div>
</template>
