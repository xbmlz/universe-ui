import type { InjectionKey } from 'vue'

export interface AvatarGroupState {
  size: () => number
}

export const AVATAR_GROUP: InjectionKey<AvatarGroupState> = Symbol('ud-avatar-group')
