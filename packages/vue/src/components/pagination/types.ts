export type PaginationSize = 'md' | 'sm'

export interface PaginationEntry {
  kind: 'page' | 'prev-more' | 'next-more'
  page?: number
}
