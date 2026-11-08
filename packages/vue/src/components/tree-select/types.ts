export interface TreeOption {
  value: string
  label: string
  children?: TreeOption[]
  disabled?: boolean
}

export interface TreeRow {
  option: TreeOption
  depth: number
}

export type TreeCheckState = 'checked' | 'unchecked' | 'indeterminate'
