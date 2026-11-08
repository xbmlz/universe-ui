export type DrawerSize = 'sm' | 'md' | 'lg'

/** Web headers are 56px, PC client headers are 68px (specified in drawer.md). */
export type DrawerHeaderSize = 'web' | 'pc'

/** `overlay` covers the page with a mask; `push` sits in the layout and squeezes the content beside it. */
export type DrawerMode = 'overlay' | 'push'

/** Responsive drawers become push drawers at or above the configured viewport width. */
export type DrawerModeSetting = DrawerMode | 'responsive'

/** `right` puts the primary action on the right; `left` puts it first on the left. */
export type DrawerFooterAlign = 'right' | 'left'

export type DrawerCloseReason = 'close' | 'mask' | 'esc' | 'cancel' | 'ok'

/** A compact text action in the drawer header. */
export interface DrawerAction {
  text: string
  disabled?: boolean
  onClick?: (event?: MouseEvent) => void
}
