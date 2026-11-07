export type DrawerSize = 'sm' | 'md' | 'lg'

/** `overlay` covers the page with a mask; `push` sits in the layout and squeezes the content beside it. */
export type DrawerMode = 'overlay' | 'push'

/** `right` puts the primary action on the right; `left` puts it first on the left. */
export type DrawerFooterAlign = 'right' | 'left'

export type DrawerCloseReason = 'close' | 'mask' | 'esc' | 'cancel' | 'ok'
