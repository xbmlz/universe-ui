/** Which side of the rail the content sits on, or alternating per item. */
export type TimelineDirection = 'left' | 'right' | 'alternate'

/** Specified in timeline.md: 16 / 24 / 32px between neighbouring nodes. */
export type TimelineSpacing = 'compact' | 'normal' | 'loose'

export type TimelineStatus
  = | 'wait'
    | 'process'
    | 'finish'
    | 'success'
    | 'warning'
    | 'error'
    | 'failed'
    | 'loading'
