import type { CascaderOption } from './types'

/** The chain of options leading to `value`, or null when it is not in the tree. */
export function findOptionPath(options: CascaderOption[], value: string): CascaderOption[] | null {
  for (const option of options) {
    if (option.value === value)
      return [option]
    if (option.children?.length) {
      const child = findOptionPath(option.children, value)
      if (child)
        return [option, ...child]
    }
  }
  return null
}

/** Specified in cascader.md: the full path is shown with "/" between levels by default. */
export function pathLabel(path: CascaderOption[] | null, separator: string): string {
  return path
    ? path.map(option => option.label).join(separator)
    : ''
}

/** Every value in the subtree, the node included. */
export function collectValues(option: CascaderOption): string[] {
  return [
    option.value,
    ...(option.children ?? []).flatMap(child => collectValues(child)),
  ]
}

/**
 * Specified in cascader.md (任意级多选): checking a parent checks all of its children.
 * The same three-way reading the tree select uses drives the row checkbox.
 */
export function subtreeState(option: CascaderOption, selected: string[]): 'checked' | 'unchecked' | 'indeterminate' {
  const values = collectValues(option)
  const count = values.filter(value => selected.includes(value)).length
  if (count === 0)
    return 'unchecked'
  return count === values.length
    ? 'checked'
    : 'indeterminate'
}
