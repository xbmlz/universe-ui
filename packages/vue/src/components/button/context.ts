import type { ComputedRef, InjectionKey } from 'vue'
import type { ButtonSize } from './types'

export const BUTTON_GROUP_SIZE: InjectionKey<ComputedRef<ButtonSize>> = Symbol('ud-button-group-size')
