
export type TItem = {
  id: string
  item_id: string
  name: string
  company_name: string
  available: string
  price: number
  preview: string
  gallery: string[]
  categories: string[]
  tags: string[]
  description: string
  specs: string[]
  meta: {
    title: string
    description: string
  }
}
