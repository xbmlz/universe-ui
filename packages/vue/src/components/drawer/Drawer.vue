<script setup lang="ts">
import type { ButtonType } from '../button/types'
import type { DrawerAction, DrawerCloseReason, DrawerFooterAlign, DrawerHeaderSize, DrawerMode, DrawerModeSetting, DrawerSize } from './types'
import { Close, Down } from '@icon-park/vue-next'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, useSlots, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Button from '../button/Button.vue'
import { lockScroll, nextDialogId, nextLayerZ, unlockScroll } from '../dialog/scroll-lock'
import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'

const {
  title = '',
  description = '',
  size = 'sm',
  width,
  headerSize,
  mode = 'overlay',
  responsive = false,
  pushBreakpoint = 1024,
  modal = false,
  closable = true,
  okText = '',
  cancelText = '',
  okType = 'primary',
  footerAlign = 'right',
  actions = [],
  beforeOk,
} = defineProps<{
  title?: string
  description?: string
  size?: DrawerSize
  width?: number | string
  /** Use the specified 56px web or 68px PC header height. */
  headerSize?: DrawerHeaderSize
  mode?: DrawerModeSetting
  /** Switch between overlay below the breakpoint and push above it. */
  responsive?: boolean
  /** Spec leaves the responsive breakpoint open; 1024 is inferred from 350px drawer plus page content. */
  pushBreakpoint?: number
  /** Modal drawers ignore the mask and Escape; close them with the close button or an action. */
  modal?: boolean
  closable?: boolean
  okText?: string
  cancelText?: string
  okType?: ButtonType
  footerAlign?: DrawerFooterAlign
  /** Header actions. At most three are shown; from the fourth, the third slot becomes "更多". */
  actions?: DrawerAction[]
  /** Return false (or a promise resolving to false) to keep the drawer open after OK. */
  beforeOk?: () => boolean | void | Promise<boolean | void>
}>()

const emit = defineEmits<{ ok: [], cancel: [], close: [reason: DrawerCloseReason] }>()
const open = defineModel<boolean>('open', { default: false })
const slots = useSlots()

const rootRef = useTemplateRef<HTMLElement>('root')
const pending = shallowRef(false)
const zIndex = shallowRef(0)
const viewportWidth = shallowRef(0)
const windowTarget = shallowRef<Window | null>(null)
const id = nextDialogId()
let locked = false
let previousFocus: HTMLElement | null = null

const hasTitle = computed(() => !!title || !!slots.title)
const resolvedMode = computed<DrawerMode>(() => (
  responsive && viewportWidth.value >= pushBreakpoint
    ? 'push'
    : mode === 'responsive'
      ? 'overlay'
      : mode
))
const hasDescription = computed(() => !!description || !!slots.description)
const hasFooter = computed(() => !!okText || !!cancelText || !!slots.footer || !!slots['footer-extra'])
const visibleActions = computed(() => (actions.length > 3
  ? actions.slice(0, 2)
  : actions))
const overflowActions = computed(() => (actions.length > 3
  ? actions.slice(2)
  : []))
const panelStyle = computed(() =>
  width === undefined
    ? undefined
    : {
        '--ud-drawer-width': typeof width === 'number'
          ? `${width}px`
          : width,
      },
)
const panelClass = computed(() => [
  `ud-drawer--${size}`,
  `ud-drawer--${resolvedMode.value}`,
  headerSize && `ud-drawer--header-${headerSize}`,
  {
    'ud-drawer--avatar': !!slots.prefix,
    'ud-drawer--tabs': !!slots.tabs,
  },
])

function dismiss(reason: DrawerCloseReason) {
  open.value = false
  emit('close', reason)
}

function onMask() {
  if (!modal)
    dismiss('mask')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && !modal)
    dismiss('esc')
}

function onAfterLeave() {
  if (!locked)
    return
  unlockScroll()
  locked = false
  previousFocus?.focus()
  previousFocus = null
}

watch([open, resolvedMode], ([value, drawerMode]) => {
  if (drawerMode !== 'overlay' || typeof document === 'undefined')
    return
  if (!value)
    return
  zIndex.value = nextLayerZ()
  if (!locked)
    lockScroll()
  locked = true
  previousFocus = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null
  nextTick(() => rootRef.value?.focus())
}, { immediate: true })

onMounted(() => {
  viewportWidth.value = window.innerWidth
  windowTarget.value = window
})
useEventListener(windowTarget, 'resize', () => {
  viewportWidth.value = window.innerWidth
})

onBeforeUnmount(onAfterLeave)

function onCancelButton() {
  emit('cancel')
  dismiss('cancel')
}

async function onOkButton() {
  if (pending.value)
    return
  emit('ok')
  if (beforeOk) {
    pending.value = true
    try {
      if ((await beforeOk()) === false)
        return
    }
    finally {
      pending.value = false
    }
  }
  dismiss('ok')
}

function onHeaderAction(action: DrawerAction, event: MouseEvent) {
  if (action.disabled)
    return
  action.onClick?.(event)
}

function onMoreAction(command: string | undefined) {
  const action = overflowActions.value[Number(command)]
  if (!action || action.disabled)
    return
  action.onClick?.()
}
</script>

<template>
  <Teleport
    to="body"
    :disabled="resolvedMode === 'push'"
  >
    <Transition
      name="ud-drawer"
      :css="resolvedMode === 'overlay'"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="open"
        ref="root"
        class="ud-drawer-root"
        :class="`ud-drawer-root--${resolvedMode}`"
        :style="resolvedMode === 'overlay' ? { zIndex } : undefined"
        :role="resolvedMode === 'overlay' ? 'dialog' : undefined"
        :aria-modal="resolvedMode === 'overlay' ? true : undefined"
        :aria-labelledby="hasTitle ? `${id}-title` : undefined"
        :aria-describedby="hasDescription ? `${id}-desc` : undefined"
        :tabindex="resolvedMode === 'overlay' ? -1 : undefined"
        @keydown="onKeydown"
      >
        <div
          v-if="resolvedMode === 'overlay'"
          class="ud-drawer-mask"
          @click="onMask"
        />
        <div
          class="ud-drawer"
          :class="panelClass"
          :style="panelStyle"
        >
          <header class="ud-drawer__header">
            <div class="ud-drawer__main">
              <span
                v-if="$slots.prefix"
                class="ud-drawer__prefix"
              ><slot name="prefix" /></span>
              <div class="ud-drawer__heading">
                <div
                  v-if="hasTitle"
                  class="ud-drawer__title-row"
                >
                  <h2
                    :id="`${id}-title`"
                    class="ud-drawer__title"
                  >
                    <slot name="title">
                      {{ title }}
                    </slot>
                  </h2>
                  <slot name="tag" />
                </div>
                <div
                  v-if="hasDescription"
                  :id="`${id}-desc`"
                  class="ud-drawer__description"
                >
                  <slot name="description">
                    {{ description }}
                  </slot>
                </div>
              </div>
              <div
                v-if="$slots.actions || actions.length || closable"
                class="ud-drawer__actions"
              >
                <span
                  v-for="action in visibleActions"
                  :key="action.text"
                  class="ud-drawer__action"
                >
                  <Button
                    type="text"
                    :disabled="action.disabled"
                    @click="onHeaderAction(action, $event)"
                  >
                    {{ action.text }}
                  </Button>
                </span>
                <Dropdown
                  v-if="overflowActions.length"
                  trigger="click"
                  placement="bottom-end"
                  @select="onMoreAction"
                >
                  <span class="ud-drawer__action">
                    <Button type="text">
                      更多
                      <ParkIcon
                        class="ud-drawer__more-caret"
                        :icon="Down"
                      />
                    </Button>
                  </span>
                  <template #menu>
                    <DropdownItem
                      v-for="(action, index) in overflowActions"
                      :key="action.text"
                      :command="String(index)"
                      :disabled="action.disabled"
                      :divided="index > 0"
                    >
                      {{ action.text }}
                    </DropdownItem>
                  </template>
                </Dropdown>
                <slot name="actions" />
                <button
                  v-if="closable"
                  type="button"
                  class="ud-drawer__close"
                  aria-label="关闭"
                  @click="dismiss('close')"
                >
                  <ParkIcon :icon="Close" />
                </button>
              </div>
            </div>
            <div
              v-if="$slots.tabs"
              class="ud-drawer__tabs"
            >
              <slot name="tabs" />
            </div>
          </header>
          <div class="ud-drawer__body">
            <slot />
          </div>
          <footer
            v-if="hasFooter"
            class="ud-drawer__footer"
            :class="`ud-drawer__footer--${footerAlign}`"
          >
            <div class="ud-drawer__buttons">
              <slot name="footer">
                <template v-if="footerAlign === 'left'">
                  <Button
                    v-if="okText"
                    :type="okType"
                    :loading="pending"
                    @click="onOkButton"
                  >
                    {{ okText }}
                  </Button>
                  <Button
                    v-if="cancelText"
                    @click="onCancelButton"
                  >
                    {{ cancelText }}
                  </Button>
                </template>
                <template v-else>
                  <Button
                    v-if="cancelText"
                    @click="onCancelButton"
                  >
                    {{ cancelText }}
                  </Button>
                  <Button
                    v-if="okText"
                    :type="okType"
                    :loading="pending"
                    @click="onOkButton"
                  >
                    {{ okText }}
                  </Button>
                </template>
              </slot>
            </div>
            <div
              v-if="$slots['footer-extra']"
              class="ud-drawer__extra"
            >
              <slot name="footer-extra" />
            </div>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
