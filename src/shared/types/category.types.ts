
export type TCategory = {
  id: string
  cat_order: number
  key: string
  value: string
  parent_key: string | null
  all_parents: string[]
  children_keys: string[]
  children: TCategory[]
  items_count: number
  show_on_main: boolean
  preview: string | null
}

export type TCategoriesList = {
  arr: TCategory[]
  obj: { [key: string]: TCategory }
}
