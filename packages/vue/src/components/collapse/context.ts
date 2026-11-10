import type { InjectionKey } from 'vue'
import type { CollapseArrow, CollapseHitArea, CollapseName } from './types'

export interface CollapseContext {
  arrow: () => CollapseArrow
  hitArea: () => CollapseHitArea
  nested: () => boolean
  isOpen: (name: CollapseName) => boolean
  toggle: (name: CollapseName) => void
}

export const COLLAPSE_KEY: InjectionKey<CollapseContext> = Symbol('collapse')
