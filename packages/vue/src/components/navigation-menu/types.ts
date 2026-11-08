import type { Component } from 'vue'

export interface NavMenuItem {
  key: string
  label: string
  /** Side-navigation glyph; the horizontal bar ignores it. */
  icon?: Component
  /** Character badge for the new-message count. */
  badge?: string | number
  children?: NavMenuItem[]
}

export type NavMenuOrientation = 'horizontal' | 'vertical'
