export type NoticeType = 'info' | 'success' | 'error' | 'warning'

export type NoticeAlign = 'left' | 'center'

/** `end` pushes single-line actions to the right edge; `follow` keeps them next to the text. */
export type NoticeActionPlacement = 'end' | 'follow'

export interface NoticeAction {
  text: string
  onClick?: (event: MouseEvent) => void
}
