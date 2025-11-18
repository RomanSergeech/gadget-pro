import { create } from 'zustand'
import { tryCatch } from '../utils'
import ApiService from '../api/api.service'

import type { TNewsItem } from '../types/news.types'


interface TState {
  news_item: TNewsItem | null
  loading: boolean
}

interface TStore extends TState {
  queryNewsItemData: ( id: string ) => void
}

const initialState: TState = {
  news_item: null,
  loading: false
}

export const useNewsItemStore = create<TStore>(
  (set) => ({
    ...initialState,

    queryNewsItemData: ( id ) => tryCatch({
      callback: async () => {
        set({ loading: true })

        const { data } = await ApiService.getNewsItem({ id })

        set({
          news_item: data.news_item
        })
      },
      onFinally: () => {
        set({ loading: false })
      }
    }),

  })
)
