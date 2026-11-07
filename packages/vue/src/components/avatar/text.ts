import type { AvatarKind } from './types'

const WIDE = /[\u1100-\u11FF\u2E80-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF\uFF00-\uFFEF]/

export function isWide(char: string) {
  return WIDE.test(char)
}

export function initials(name: string, kind: AvatarKind) {
  const value = name.trim()
  if (!value)
    return ''
  if (kind === 'group')
    return value

  const chars = [
    ...value.replace(/\s+/g, ''),
  ]
  const wide = chars.some(isWide)

  if (kind === 'person') {
    if (wide)
      return chars.slice(-2).join('')
    const words = value.split(/\s+/)
    const first = words[0]![0] ?? ''
    const last = words.length > 1
      ? words[words.length - 1]![0] ?? ''
      : ''
    return (first + last).toUpperCase()
  }
  if (kind === 'app') {
    if (wide)
      return chars.slice(0, 2).join('')
    return chars.filter(c => /[\p{L}\p{N}]/u.test(c)).slice(0, 2).join('').toUpperCase()
  }
  return chars[0]!.toUpperCase()
}

/** Group text: a wide character counts as 2 units, 4 units per line, at most 2 lines. */
export function groupLines(text: string) {
  const lines: string[] = ['']
  let used = 0
  for (const char of text) {
    const units = isWide(char)
      ? 2
      : 1
    if (used + units > 4) {
      if (lines.length === 2)
        break
      lines.push('')
      used = 0
    }
    lines[lines.length - 1] += char
    used += units
  }
  return lines
}

export function textUnits(text: string) {
  let units = 0
  for (const char of text) {
    units += isWide(char)
      ? 2
      : 1
  }
  return units
}

/** Font size as a fraction of the avatar size, from the spec's reference canvases. */
export function fontRatio(text: string, kind: AvatarKind) {
  if (kind === 'person') {
    return [...text].some(isWide)
      ? 274 / 640
      : 340 / 640
  }
  if (kind === 'app')
    return 92 / 208
  if (kind === 'enterprise')
    return 78 / 208
  const units = textUnits(text)
  if (units <= 1)
    return 116 / 208
  if (units === 2)
    return 92 / 208
  if (units <= 4)
    return 72 / 208
  return 60 / 208
}
