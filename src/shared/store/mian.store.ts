import { create } from 'zustand'
import { tryCatch } from '../utils'
import ApiService from '../api/api.service'

import type { TNewsItem } from '../types/news.types'
import type { TCategoriesList, TCategory } from '../types/category.types'
import type { TItem } from '../types/item.type'
import type { TSlide } from '../types/slide.types'


interface TState {
  new: TItem[]
  popular: TItem[]
  recent: TItem[]
  slides: TSlide[]
  news: TNewsItem[]
  categories_list: TCategory[]
  categories: TCategoriesList
  loading: boolean
}

interface TStore extends TState {
  queryMainData: () => void
}

const initialState: TState = {
  new: [],
  popular: [],
  recent: [],
  slides: [],
  news: [],
  categories_list: [],
  categories: { arr: [], obj: {} },
  loading: false
}

export const useMainStore = create<TStore>(
  (set) => ({
    ...initialState,

    queryMainData: () => tryCatch({
      callback: async () => {
        set({ loading: true })

        const { data } = await ApiService.queryMainData()

        set({
          new: data.items.new,
          popular: data.items.popular,
          recent: data.items.recent,
          slides: data.slides,
          news: data.news,
          categories: data.categories.list,
          categories_list: data.categories.show
        })
      },
      onFinally: () => {
        set({ loading: false })
      }
    }),

  })
)
