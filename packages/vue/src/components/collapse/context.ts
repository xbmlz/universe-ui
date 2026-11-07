import type { InjectionKey } from 'vue'
import type { CollapseArrow, CollapseName } from './types'

export interface CollapseContext {
  arrow: () => CollapseArrow
  isOpen: (name: CollapseName) => boolean
  toggle: (name: CollapseName) => void
}

export const COLLAPSE_KEY: InjectionKey<CollapseContext> = Symbol('collapse')
