import { create } from 'zustand'
import { tryCatch } from '../utils'
import ApiService from '../api/api.service'

import type { TNewsItem } from '../types/news.types'
import type { TCategoriesList, TCategory } from '../types/category.types'
import type { TItem } from '../types/item.type'
import type { TSlide } from '../types/slide.types'
import type { TMakeOrderRequest, TSearchItemsRequest, TSearchItemsResponse } from '../types/api.types'


interface TState {
  new: TItem[]
  popular: TItem[]
  recent: TItem[]
  slides: TSlide[]
  news: {
    list: TNewsItem<'cutted'>[]
    show: TNewsItem<'cutted'>[]
  }
  categories_list: TCategory[]
  categories: TCategoriesList
  loading: boolean
  order_id: string | null
  common: {
    payinfo: string
    about: string
    phones: string
    address: string
  }
  searched: TSearchItemsResponse['list']
}

interface TStore extends TState {
  queryMainData: () => Promise<void>
  queryRecentItems: () => Promise<void>
  makeOrder: ( sendData: TMakeOrderRequest ) => Promise<void>
  searchItems: ( sendData: TSearchItemsRequest ) => Promise<void>
}

const initialState: TState = {
  new: [],
  popular: [],
  recent: [],
  slides: [],
  news: { list: [], show: [] },
  categories_list: [],
  categories: { arr: [], obj: {} },
  loading: true,
  order_id: null,
  common: {
    payinfo: '',
    about: '',
    phones: '',
    address: '',
  },
  searched: []
}

export const useMainStore = create<TStore>(
  (set, get) => ({
    ...initialState,

    queryMainData: () => tryCatch({
      callback: async () => {
        set({ loading: true })

        const { data } = await ApiService.queryMainData()

        get().queryRecentItems()

        set({
          new: data.items.new,
          popular: data.items.popular,
          slides: data.slides,
          news: data.news,
          categories: data.categories.list,
          categories_list: data.categories.show,
          common: data.common
        })
      },
      onFinally: () => {
        set({ loading: false })
      }
    }),

    queryRecentItems: () => tryCatch({
      callback: async () => {

        const recent: string[] = JSON.parse(localStorage.getItem('recent') || '[]')

        const { data } = await ApiService.queryRecentItems({ recent })

        set({
          recent: data.recent
        })
      }
    }),

    makeOrder: ( sendData ) => tryCatch({
      callback: async () => {
        set({ loading: true })

        const { data } = await ApiService.makeOrder(sendData)

        set({ order_id: data.order_id })
      },
      onFinally: () => {
        set({ loading: false })
      }
    }),

    searchItems: ( sendData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.searchItems(sendData)

        set({ searched: data.list })
      }
    }),

  })
)
