import type { InjectionKey, Ref } from 'vue'
import type { TabValue } from './types'

export interface TabsState {
  model: Ref<TabValue | null>
}

export const TABS: InjectionKey<TabsState> = Symbol('ud-tabs')
