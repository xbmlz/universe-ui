import type { SelectOption } from './types'

export interface MatchPart {
  text: string
  match: boolean
}

/** Case-insensitive label search. An empty query keeps the list unchanged. */
export function filterOptions(options: SelectOption[], query: string): SelectOption[] {
  const text = query.trim().toLowerCase()
  if (!text)
    return options
  return options.filter(option => option.label.toLowerCase().includes(text))
}

/** The first option that can be chosen; falls back to the first row when all are disabled. */
export function firstEnabledIndex(options: SelectOption[]): number {
  const index = options.findIndex(option => !option.disabled)
  return index < 0
    ? 0
    : index
}

/** Splits a label around the first match so the query can be highlighted. */
export function matchParts(label: string, query: string): MatchPart[] {
  const text = query.trim()
  const index = text
    ? label.toLowerCase().indexOf(text.toLowerCase())
    : -1
  if (!text || index < 0) {
    return [
      { text: label, match: false },
    ]
  }
  return [
    {
      text: label.slice(0, index),
      match: false,
    },
    {
      text: label.slice(index, index + text.length),
      match: true,
    },
    {
      text: label.slice(index + text.length),
      match: false,
    },
  ].filter(part => part.text)
}
