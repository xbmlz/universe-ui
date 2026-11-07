import type { NotificationConfig, NotificationHandle, NotificationOptions, NotificationType } from './types'
import { createApp } from 'vue'
import NotificationHost from './NotificationHost.vue'
import { add, config, remove, update } from './store'

let mounted = false

function ensureHost() {
  if (mounted || typeof document === 'undefined')
    return
  const el = document.createElement('div')
  document.body.appendChild(el)
  createApp(NotificationHost).mount(el)
  mounted = true
}

function show(options: NotificationOptions): NotificationHandle {
  ensureHost()
  const id = add(options)
  return {
    close: () => remove(id),
    update: next => update(id, next),
  }
}

type Shortcut = (
  content: string,
  options?: Omit<NotificationOptions, 'content' | 'type'>,
) => NotificationHandle

const shortcut = (type: NotificationType): Shortcut => (content, options) => show({ ...options, content, type })

export const notification = {
  show,
  info: shortcut('info'),
  success: shortcut('success'),
  warning: shortcut('warning'),
  error: shortcut('error'),
  config(next: NotificationConfig) {
    config.value = {
      ...config.value,
      ...next,
    }
  },
}
