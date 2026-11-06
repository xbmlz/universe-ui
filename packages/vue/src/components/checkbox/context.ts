import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface CheckboxGroupState {
  model: Ref<(string | number)[]>
  disabled: ComputedRef<boolean>
}

export const CHECKBOX_GROUP: InjectionKey<CheckboxGroupState> = Symbol('ud-checkbox-group')
