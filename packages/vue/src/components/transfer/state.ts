import type { TransferItem } from './types'

function matches(item: TransferItem, query: string) {
  const text = query.trim().toLowerCase()
  return !text || item.label.toLowerCase().includes(text)
}

/** Everything that matches the search, whether or not it has been chosen yet. */
export function matchingItems(data: TransferItem[], query: string): TransferItem[] {
  return data.filter(item => matches(item, query))
}

/** The left list: everything that has not been moved, filtered by its own search. */
export function availableItems(data: TransferItem[], selected: string[], query: string): TransferItem[] {
  return data.filter(item => !selected.includes(item.key) && matches(item, query))
}

/** The right list: the chosen keys in their original order. */
export function chosenItems(data: TransferItem[], selected: string[]): TransferItem[] {
  return data.filter(item => selected.includes(item.key))
}

/** Adds the checked keys, keeping the original order of the data. */
export function moveRight(data: TransferItem[], selected: string[], checked: string[]): string[] {
  const order = data.map(item => item.key)
  return order.filter(key => selected.includes(key) || checked.includes(key))
}

/** Removes the checked keys from the chosen list. */
export function moveLeft(selected: string[], checked: string[]): string[] {
  return selected.filter(key => !checked.includes(key))
}

/** A header checkbox is checked when every visible, enabled row is checked. */
export function allChecked(items: TransferItem[], checked: string[]): boolean {
  const usable = items.filter(item => !item.disabled)
  return usable.length > 0 && usable.every(item => checked.includes(item.key))
}
