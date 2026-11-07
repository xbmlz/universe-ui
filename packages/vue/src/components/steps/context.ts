import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { StepsDirection, StepStatus, StepsVariant } from './types'

export interface StepsRegistration {
  id: number
  index: ComputedRef<number>
  setStatus: (status: StepStatus) => void
}

export interface StepsContext {
  active: Ref<number>
  clickable: ComputedRef<boolean>
  direction: ComputedRef<StepsDirection>
  variant: ComputedRef<StepsVariant>
  ids: Ref<number[]>
  statuses: Ref<Record<number, StepStatus>>
  register: () => StepsRegistration
}

export const STEPS_KEY: InjectionKey<StepsContext> = Symbol('steps')
