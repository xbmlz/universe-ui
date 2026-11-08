import type { TreeCheckState, TreeOption, TreeRow } from './types'

/** The chain of nodes leading to `value`, or null when it is not in the tree. */
export function findTreePath(options: TreeOption[], value: string): TreeOption[] | null {
  for (const option of options) {
    if (option.value === value)
      return [option]
    if (option.children?.length) {
      const child = findTreePath(option.children, value)
      if (child)
        return [option, ...child]
    }
  }
  return null
}

/** Every value in the subtree, the node included. */
export function collectValues(option: TreeOption): string[] {
  return [
    option.value,
    ...(option.children ?? []).flatMap(child => collectValues(child)),
  ]
}

/** Rows to draw: a node's children appear only when the node is expanded. */
export function flattenTree(options: TreeOption[], expanded: Set<string>): TreeRow[] {
  const rows: TreeRow[] = []
  const walk = (nodes: TreeOption[], depth: number) => {
    for (const node of nodes) {
      rows.push({ option: node, depth })
      if (node.children?.length && expanded.has(node.value))
        walk(node.children, depth + 1)
    }
  }
  walk(options, 0)
  return rows
}

/** Keeps the nodes whose label matches and the ancestors needed to reach them. */
export function filterTree(options: TreeOption[], query: string): TreeOption[] {
  const text = query.trim().toLowerCase()
  if (!text)
    return options
  const walk = (nodes: TreeOption[]): TreeOption[] => nodes.flatMap((node) => {
    const matched = node.label.toLowerCase().includes(text)
    if (matched) {
      return [
        { ...node },
      ]
    }
    const children = node.children
      ? walk(node.children)
      : []
    return children.length
      ? [
          { ...node, children },
        ]
      : []
  })
  return walk(options)
}

/** A parent is checked when every value in its subtree is selected. */
export function subtreeState(option: TreeOption, selected: string[]): TreeCheckState {
  const values = collectValues(option)
  const count = values.filter(value => selected.includes(value)).length
  if (count === 0)
    return 'unchecked'
  return count === values.length
    ? 'checked'
    : 'indeterminate'
}

/** Unions or removes a whole subtree, which is what checking a parent does. */
export function toggleSubtree(selected: string[], option: TreeOption, checked: boolean): string[] {
  const values = collectValues(option)
  if (checked) {
    return [
      ...new Set([
        ...selected,
        ...values,
      ]),
    ]
  }
  return selected.filter(value => !values.includes(value))
}
