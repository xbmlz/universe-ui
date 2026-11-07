<script setup lang="ts">
import type { ButtonType } from '../button/types'
import type { DialogCloseReason, DialogFooterDirection, DialogSize, DialogType } from './types'
import { Attention, CheckOne, Close, CloseOne, Info } from '@icon-park/vue-next'
import { computed, nextTick, onBeforeUnmount, shallowRef, useSlots, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Button from '../button/Button.vue'
import { lockScroll, nextDialogId, nextLayerZ, unlockScroll } from './scroll-lock'

const {
  title = '',
  description = '',
  type,
  size = 'sm',
  width,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  top,
  closable = true,
  maskClosable = true,
  keyboard = true,
  okText = '',
  cancelText = '',
  okType = 'primary',
  footerDirection = 'horizontal',
  beforeOk,
} = defineProps<{
  title?: string
  description?: string
  type?: DialogType
  size?: DialogSize
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  /** Distance from the top of the viewport; centred when omitted. */
  top?: number | string
  closable?: boolean
  maskClosable?: boolean
  keyboard?: boolean
  okText?: string
  cancelText?: string
  okType?: ButtonType
  footerDirection?: DialogFooterDirection
  /** Return false (or a promise resolving to false) to keep the dialog open after OK. */
  beforeOk?: () => boolean | void | Promise<boolean | void>
}>()

const emit = defineEmits<{ ok: [], cancel: [], close: [reason: DialogCloseReason] }>()
const open = defineModel<boolean>('open', { default: false })
const slots = useSlots()

const rootRef = useTemplateRef<HTMLElement>('root')
const bodyRef = useTemplateRef<HTMLElement>('body')
const overflowing = shallowRef(false)
const pending = shallowRef(false)
const zIndex = shallowRef(0)
let locked = false
let previousFocus: HTMLElement | null = null

const id = nextDialogId()
const ICONS = {
  info: Info,
  success: CheckOne,
  error: CloseOne,
  warning: Attention,
}

function length(value: number | string | undefined) {
  return typeof value === 'number'
    ? `${value}px`
    : value
}

const hasBody = computed(() => !!slots.default)
const hasDescription = computed(() => !!description || !!slots.description)
const hasFooter = computed(() => !!okText || !!cancelText || !!slots.footer || !!slots['footer-extra'])
const hasIcon = computed(() => !!type || !!slots.icon)

const panelStyle = computed(() => ({
  '--ud-dialog-width': length(width),
  'minWidth': length(minWidth),
  'maxWidth': maxWidth === undefined
    ? undefined
    : `min(${length(maxWidth)}, 100%)`,
  'minHeight': length(minHeight),
  'maxHeight': maxHeight === undefined
    ? undefined
    : `min(${length(maxHeight)}, 100%)`,
}))
const rootStyle = computed(() => ({
  'zIndex': zIndex.value,
  '--ud-dialog-top': top === undefined
    ? undefined
    : length(top),
}))

function dismiss(reason: DialogCloseReason) {
  open.value = false
  emit('close', reason)
}

function onMask() {
  if (maskClosable)
    dismiss('mask')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && keyboard)
    dismiss('esc')
}

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

function measure() {
  const body = bodyRef.value
  overflowing.value = !!body && body.scrollHeight > body.clientHeight + 1
}

let observer: ResizeObserver | undefined

function observe() {
  observer ??= new ResizeObserver(measure)
  observer.disconnect()
  const body = bodyRef.value
  if (!body)
    return
  observer.observe(body)
  for (const child of body.children) observer.observe(child)
  measure()
}

function onAfterLeave() {
  observer?.disconnect()
  if (!locked)
    return
  unlockScroll()
  locked = false
  previousFocus?.focus()
  previousFocus = null
}

watch(open, (value) => {
  if (!value || typeof document === 'undefined')
    return
  zIndex.value = nextLayerZ()
  if (!locked)
    lockScroll()
  locked = true
  previousFocus = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null
  nextTick(() => {
    rootRef.value?.focus()
    observe()
  })
}, { immediate: true })

onBeforeUnmount(onAfterLeave)
</script>

<template>
  <Teleport to="body">
    <Transition
      name="ud-dialog"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="open"
        ref="root"
        class="ud-dialog-root"
        :class="{ 'ud-dialog-root--top': top !== undefined }"
        :style="rootStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title || $slots.title ? `${id}-title` : undefined"
        :aria-describedby="hasDescription ? `${id}-desc` : undefined"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <div
          class="ud-dialog-mask"
          @click="onMask"
        />
        <div
          class="ud-dialog"
          :class="[
            `ud-dialog--${size}`,
            {
              'ud-dialog--icon': hasIcon,
              'ud-dialog--overflow': overflowing,
              'ud-dialog--title-only': !hasBody && !hasDescription,
            },
          ]"
          :style="panelStyle"
        >
          <header class="ud-dialog__header">
            <span
              v-if="hasIcon"
              class="ud-dialog__icon"
              :class="type && `ud-dialog__icon--${type}`"
            >
              <slot name="icon"><ParkIcon
                v-if="type"
                :icon="ICONS[type]"
                theme="filled"
              /></slot>
            </span>
            <div class="ud-dialog__heading">
              <h2
                v-if="title || $slots.title"
                :id="`${id}-title`"
                class="ud-dialog__title"
              >
                <slot name="title">
                  {{ title }}
                </slot>
              </h2>
              <div
                v-if="hasDescription"
                :id="`${id}-desc`"
                class="ud-dialog__description"
              >
                <slot name="description">
                  {{ description }}
                </slot>
              </div>
            </div>
            <button
              v-if="closable"
              type="button"
              class="ud-dialog__close"
              aria-label="关闭"
              @click="dismiss('close')"
            >
              <ParkIcon :icon="Close" />
            </button>
          </header>
          <div
            v-if="hasBody"
            ref="body"
            class="ud-dialog__body"
          >
            <slot />
          </div>
          <footer
            v-if="hasFooter"
            class="ud-dialog__footer"
            :class="{ 'ud-dialog__footer--vertical': footerDirection === 'vertical' }"
          >
            <div
              v-if="$slots['footer-extra']"
              class="ud-dialog__extra"
            >
              <slot name="footer-extra" />
            </div>
            <div class="ud-dialog__actions">
              <slot name="footer">
                <template v-if="footerDirection === 'vertical'">
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
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
