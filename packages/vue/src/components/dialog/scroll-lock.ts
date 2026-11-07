let seed = 0
let count = 0
let previous = ''
let zSeed = 1200

export function nextLayerZ() {
  return ++zSeed
}

export function nextDialogId() {
  return `ud-dialog-${++seed}`
}

/** Modal dialogs block the page, so the page behind them must not scroll either. */
export function lockScroll() {
  if (count++ > 0 || typeof document === 'undefined')
    return
  const root = document.documentElement
  previous = root.style.overflow
  root.style.overflow = 'hidden'
}

export function unlockScroll() {
  if (count === 0 || --count > 0 || typeof document === 'undefined')
    return
  document.documentElement.style.overflow = previous
}
