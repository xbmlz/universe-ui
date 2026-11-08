export interface AnchorItem {
  /** The id of the section to scroll to. */
  key: string
  label: string
  children?: AnchorItem[]
}
