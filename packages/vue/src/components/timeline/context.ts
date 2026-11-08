import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { TimelineDirection, TimelineSpacing } from './types'

export interface TimelineRegistration {
  id: number
  index: ComputedRef<number>
  last: ComputedRef<boolean>
}

export interface TimelineContext {
  direction: ComputedRef<TimelineDirection>
  spacing: ComputedRef<TimelineSpacing>
  ids: Ref<number[]>
  expanded: Ref<boolean>
  collapseTail: ComputedRef<number>
  register: () => TimelineRegistration
}

export const TIMELINE_KEY: InjectionKey<TimelineContext> = Symbol('timeline')
