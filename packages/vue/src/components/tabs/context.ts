import type { InjectionKey, Ref, ShallowRef } from 'vue'
import type { TabValue } from './types'

export interface TabsItem {
  value: TabValue
  button: ShallowRef<HTMLButtonElement | null>
  host: ShallowRef<HTMLElement | null>
  disabled: () => boolean
  label: () => string
}

export interface TabsState {
  model: Ref<TabValue | null>
  items: TabsItem[]
  register: (item: TabsItem) => void
  unregister: (value: TabValue) => void
}

export const TABS: InjectionKey<TabsState> = Symbol('ud-tabs')
