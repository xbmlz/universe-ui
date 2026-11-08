export interface CellState {
  filled: boolean
  active: boolean
}

/** Keeps only digits, capped at the code length. */
export function digitsOnly(text: string, length: number): string {
  return text.replace(/\D/g, '').slice(0, length)
}

/** Appends one digit; returns null when the digit is not usable or the code is full. */
export function appendDigit(value: string, digit: string, length: number): string | null {
  if (!/^\d$/.test(digit) || value.length >= length)
    return null
  return (value + digit).slice(0, length)
}

export function backspace(value: string): string {
  return value.slice(0, -1)
}

/** The next cell to type into; a full code keeps the caret on the last cell. */
export function cursorIndex(value: string, length: number): number {
  return value.length >= length
    ? length - 1
    : value.length
}

/**
 * Each cell is active when it holds a digit or is the next free cell of a focused field.
 * A complete or disabled field never marks a cell as active.
 */
export function cellStates(value: string, length: number, focused: boolean, disabled: boolean): CellState[] {
  const complete = value.length >= length
  return Array.from({ length }, (_, index) => {
    if (disabled || complete)
      return { filled: index < value.length, active: false }
    if (index < value.length)
      return { filled: true, active: true }
    return { filled: false, active: focused && index === value.length }
  })
}
