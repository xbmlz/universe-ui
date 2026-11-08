/** A finished number: no trailing dot, no bare sign. */
export const COMPLETE_NUMBER = /^-?\d+(?:\.\d+)?$/

/** A number still being typed: at most one dot and an optional sign. */
export const PARTIAL_NUMBER = /^-?\d*\.?$/

export interface NumberBounds {
  min?: number
  max?: number
  step?: number
}

export function decimalPlaces(value: number): number {
  const source = String(value)
  const index = source.indexOf('.')
  return index === -1
    ? 0
    : source.length - index - 1
}

/** Clamps to the bounds, then rounds to the precision of the step. */
export function clampNumber(value: number, { min, max, step = 1 }: NumberBounds = {}): number {
  let next = value
  if (min != null && next < min)
    next = min
  if (max != null && next > max)
    next = max
  return Number(next.toFixed(decimalPlaces(step)))
}

/** `undefined` means the text is still partial, so the model keeps its previous value. */
export function inputValue(text: string): number | null | undefined {
  if (text === '')
    return null
  if (COMPLETE_NUMBER.test(text))
    return Number(text)
  if (PARTIAL_NUMBER.test(text))
    return undefined
  return null
}

export type BlurAction
  = | { kind: 'commit', value: number }
    | { kind: 'reset' }
    | { kind: 'keep' }

/** Decides what leaving the field does with the text: commit, fall back to the model, or leave it. */
export function blurAction(text: string): BlurAction {
  if (COMPLETE_NUMBER.test(text)) {
    return {
      kind: 'commit',
      value: Number(text),
    }
  }

  if (text === '' || text === '-' || text === '.' || text.endsWith('.')) {
    const parsed = Number(text)
    if (text.endsWith('.') && Number.isFinite(parsed))
      return { kind: 'commit', value: parsed }
    return { kind: 'reset' }
  }

  return { kind: 'keep' }
}
