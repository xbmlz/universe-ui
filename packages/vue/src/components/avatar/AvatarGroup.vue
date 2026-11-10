<script setup lang="ts">
import type { AvatarColor, AvatarKind } from './types'
import { More } from '@icon-park/vue-next'
import { computed, onBeforeUnmount, onMounted, provide, shallowRef, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { Dropdown } from '../dropdown'
import Avatar from './Avatar.vue'
import { AVATAR_GROUP } from './context'

export interface AvatarGroupPerson {
  name: string
  src?: string
  color?: AvatarColor
  kind?: AvatarKind
}

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
const hiddenPeople = shallowRef<AvatarGroupPerson[]>([])

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
  hiddenPeople.value = avatars
    .slice(shown)
    .map((avatar) => {
      const name = avatar.dataset.name ?? ''
      const src = avatar.dataset.src || undefined
      const color = avatar.dataset.color as AvatarColor | undefined
      const kind = avatar.dataset.kind as AvatarKind | undefined
      return {
        name,
        src,
        color,
        kind,
      }
    })
    .filter(person => person.name || person.src)
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

function onMore(event: MouseEvent) {
  emit('more', event)
}
</script>

<template>
  <div
    ref="root"
    class="ud-avatar-group"
    :class="`ud-avatar-group--${size}`"
    :style="style"
  >
    <slot />
    <Dropdown
      v-if="rest > 0"
      class="ud-avatar-group__more-ref"
      trigger="click"
      placement="bottom-end"
    >
      <button
        type="button"
        class="ud-avatar-group__more"
        :aria-label="`还有 ${rest} 人`"
        @click="onMore"
      >
        <ParkIcon
          v-if="overflow"
          :icon="More"
        />
        <template v-else>
          +{{ rest }}
        </template>
      </button>
      <template #menu>
        <slot
          name="more"
          :people="hiddenPeople"
          :rest="rest"
        >
          <div
            class="ud-avatar-group__people"
            role="list"
          >
            <div
              v-for="(person, index) in hiddenPeople"
              :key="`${person.name}-${index}`"
              class="ud-avatar-group__person"
              role="listitem"
            >
              <Avatar
                :src="person.src"
                :name="person.name"
                :color="person.color"
                :kind="person.kind"
                :size="20"
              />
              <span class="ud-avatar-group__person-name">{{ person.name }}</span>
            </div>
          </div>
        </slot>
      </template>
    </Dropdown>
  </div>
</template>
