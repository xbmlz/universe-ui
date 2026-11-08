import type { Component, VNode } from 'vue'
import type { ButtonType } from '../button/types'

/** Content accepted by the imperative service. */
export type NotificationContent = string | VNode | Component

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

/** Stripe colours for notifications without an icon. */
export type NotificationColor = 'blue' | 'green' | 'orange' | 'red'

export interface NotificationAction {
  text: string
  /** Defaults to `primary` for the last action and `secondary` for the others. */
  type?: ButtonType
  onClick?: (event: MouseEvent) => void
}

export interface NotificationOptions {
  content: NotificationContent
  title?: string
  type?: NotificationType
  /** Milliseconds before closing. 0 keeps the notification until it is closed. */
  duration?: number
  closable?: boolean
  showIcon?: boolean
  color?: NotificationColor
  actions?: NotificationAction[]
  onClose?: () => void
}

export interface NotificationHandle {
  close: () => void
  update: (options: Partial<NotificationOptions>) => void
}

export interface NotificationConfig {
  /** Maximum visible notifications; 0 means no limit. */
  max?: number
  top?: number
  right?: number
  /** Element or selector that should contain the notification host. Defaults to the page body. */
  container?: string | HTMLElement | null
}
