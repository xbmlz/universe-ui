import type { ToastConfig, ToastHandle, ToastOptions, ToastType } from './types'
import { createApp } from 'vue'
import { add, config, remove, update } from './store'
import ToastHost from './ToastHost.vue'

let mounted = false

function ensureHost() {
  if (mounted || typeof document === 'undefined')
    return
  const el = document.createElement('div')
  document.body.appendChild(el)
  createApp(ToastHost).mount(el)
  mounted = true
}

function show(options: ToastOptions): ToastHandle {
  ensureHost()
  const id = add(options)
  return {
    close: () => remove(id),
    update: next => update(id, next),
  }
}

type Shortcut = (content: string, options?: Omit<ToastOptions, 'content' | 'type'>) => ToastHandle

const shortcut = (type: ToastType): Shortcut => (content, options) => show({ ...options, content, type })

export const toast = {
  show,
  info: shortcut('info'),
  success: shortcut('success'),
  error: shortcut('error'),
  warning: shortcut('warning'),
  loading: shortcut('loading'),
  config(next: ToastConfig) {
    config.value = {
      ...config.value,
      ...next,
    }
  },
}
