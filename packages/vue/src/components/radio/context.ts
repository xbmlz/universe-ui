import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { RadioSize } from './types'

export interface RadioGroupState {
  model: Ref<string | number | null>
  name: string
  disabled: ComputedRef<boolean>
  button: ComputedRef<boolean>
  size: ComputedRef<RadioSize>
}

export const RADIO_GROUP: InjectionKey<RadioGroupState> = Symbol('ud-radio-group')
