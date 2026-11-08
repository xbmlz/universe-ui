<script setup lang="ts">
import { More } from '@icon-park/vue-next'
import { computed, onBeforeUnmount, onMounted, provide, shallowRef, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { Tooltip } from '../tooltip'
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
const hiddenNames = shallowRef<string[]>([])

function layout() {
  const el = root.value
  if (!el)
    return
  const avatars = [
    ...el.querySelectorAll<HTMLElement>(':scope > .ud-avatar-tooltip > .ud-avatar'),
  ]
  const shown = avatars.length <= max + 1
    ? avatars.length
    : max
  avatars.forEach((avatar, index) => {
    const host = avatar.closest<HTMLElement>('.ud-avatar-tooltip') ?? avatar
    host.hidden = index >= shown
  })
  rest.value = avatars.length - shown
  hiddenNames.value = avatars
    .slice(shown)
    .map(avatar => avatar.dataset.name ?? '')
    .filter(Boolean)
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
const moreContent = computed(() => hiddenNames.value.join('、'))

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
    <Tooltip
      v-if="rest > 0"
      class="ud-avatar-group__more-tooltip"
      :content="moreContent"
    >
      <button
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
    </Tooltip>
  </div>
</template>
