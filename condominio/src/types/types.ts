export type Paginated<T> = {
  page: T[]
  total: number,
  nextPage?: number | undefined | null,
  
  prevPage?: number | undefined | null
}