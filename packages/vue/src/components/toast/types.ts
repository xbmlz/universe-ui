import type { Component, VNode } from 'vue'

export type ToastType = 'info' | 'success' | 'error' | 'warning' | 'loading'

/** Content accepted by the imperative service. */
export type ToastContent = string | VNode | Component

export interface ToastAction {
  text: string
  onClick?: (event: MouseEvent) => void
}

export interface ToastOptions {
  content: ToastContent
  type?: ToastType
  /** Milliseconds before closing. 0 keeps the toast until it is closed. */
  duration?: number
  closable?: boolean
  actions?: ToastAction[]
  onClose?: () => void
}

export interface ToastHandle {
  close: () => void
  update: (options: Partial<ToastOptions>) => void
}

export interface ToastConfig {
  max?: number
  top?: number
  /** Element or selector that should contain the toast host. Defaults to the page body. */
  container?: string | HTMLElement | null
}
