import type { InjectionKey } from 'vue'

export interface DropdownContext {
  id: string
  close: () => void
  hold: () => void
  hide: (event?: PointerEvent) => void
  select: (command: string | undefined) => void
}

export const DROPDOWN_KEY: InjectionKey<DropdownContext> = Symbol('dropdown')
