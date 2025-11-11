import type { TCategoriesList, TCategory } from "./category.types"
import type { TItem } from "./item.type"
import type { TNewsItem } from "./news.types"
import type { TSlide } from "./slide.types"


export type TLoginRequest = {
  email: string
  password: string
}
export type TLoginResponse = {
  access_token: string
}

export type TCheckAuthResponse = {
  access_token: string
}

export type TGetMainDataResponse = {
  items: {
    new: TItem[]
    popular: TItem[]
    recent: TItem[]
  }
  categories: {
    list: TCategoriesList
    show: TCategory[]
  }
  slides: TSlide[]
  news: TNewsItem[]
}

export type TQueryItemDataRequest = {
  item_id: string
}
export type TQueryItemDataResponse = {
  item: TItem
}

export type TQueryItemsListRequest = {
  ids?: string[]
  page?: number
  cat_keys?: string[]
  pricemin?: number
  pricemax?: number
  pricesort?: 'asc' | 'desc'
  available?: 'available'|'unavailable'
}
export type TQueryItemsListResponse = {
  list: TItem[]
  total: number
  page: number
  pages: number
}

export type TAddItemRequest = Omit<TItem, 'id'|'item_id'|'preview'>
export type TAddItemResponse = {
  list: TItem[]
}

export type TEditItemRequest = Omit<TItem, 'id'|'item_id'|'preview'>
export type TEditItemResponse = {
  list: TItem[]
}

export type TDeleteItemRequest = {
  id: string
}
export type TDeleteItemResponse = {
  list: TItem[]
}

export type TGetCategoriesListResponse = {
  list: TCategoriesList
}

export type TAddCategoryRequest = Omit<TCategory, 'id'|'children'|'items_count'|'all_parents'>
export type TAddCategoryResponse = TGetCategoriesListResponse

export type TEditCategoryRequest = Omit<TCategory, 'children'|'items_count'|'all_parents'>
export type TEditCategoryResponse = TGetCategoriesListResponse

export type TDeleteCategoryRequest = {
  cat_key: string
}
export type TDeleteCategoryResponse = TGetCategoriesListResponse

export type TMakeOrderRequest = {
  items: {
    item: TItem
    count: number
    amount: number
  }[]
  name: string
  phone: string
  email: string
  message: string
}
export type TMakeOrderResponse = {
  order_id: string
}