export type ToastType = 'info' | 'success' | 'error' | 'warning' | 'loading'

export interface ToastAction {
  text: string
  onClick?: (event: MouseEvent) => void
}

export interface ToastOptions {
  content: string
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
}
