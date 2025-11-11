import { create } from 'zustand'
import { tryCatch } from '../utils'
import ApiService from '../api/api.service'

import type { TQueryItemsListRequest } from '../types/api.types'
import type { TItem } from '../types/item.type'


interface TState {
  query: TQueryItemsListRequest
  list: TItem[]
  total: number
  page: number
  pages: number
  loading: boolean
}

interface TStore extends TState {
  setQueryParams: ( params: Partial<TState['query']> ) => void
  queryItemsList: () => Promise<void>
}

const initialState: TState = {
  query: {},
  list: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false
}

export const useCategoriesStore = create<TStore>(
  (set, get) => ({
    ...initialState,

    setQueryParams: ( params ) => {
      const query = { ...get().query, ...params }
      set({ query })
    },

    queryItemsList: () => tryCatch({
      callback: async () => {
        set({ loading: true, list: [] })

        const query = get().query

        const { data } = await ApiService.queryItemsList(query)

        set({ ...data })
      },
      onFinally: () => {
        set({ loading: false })
      }
    }),

  })
)
