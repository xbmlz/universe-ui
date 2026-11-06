import type { ComputedRef, InjectionKey } from 'vue'
import type { InputSize } from './types'

export interface InputGroupState {
  size: ComputedRef<InputSize>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  error: ComputedRef<boolean>
}

export const INPUT_GROUP: InjectionKey<InputGroupState> = Symbol('ud-input-group')
