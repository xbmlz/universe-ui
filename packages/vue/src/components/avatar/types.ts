export type AvatarKind = 'person' | 'group' | 'app' | 'enterprise'

export type AvatarShape = 'circle' | 'square'

export type AvatarColor
  = | 'blue'
    | 'purple'
    | 'turquoise'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange'
    | 'carmine'

/** Optional override for the script used by a personnel name. */
export type AvatarNameLocale = 'auto' | 'zh' | 'en' | 'ja'
