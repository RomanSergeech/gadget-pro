import { create } from 'zustand'
import { tryCatch } from '../utils'
import ApiService from '../api/api.service'
import { useMainStore } from './mian.store'

import type { TQueryItemsListRequest } from '../types/api.types'
import type { TItem } from '../types/item.type'
import type { TCategory } from '../types/category.types'


export type TDeepObj = {
  [key: string]: TDeepObj
}


interface TState {
  query: Omit<TQueryItemsListRequest, 'cat_keys'> & {
    cat_keys: TDeepObj
  }
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
  query: { cat_keys: {} },
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

        const catsArr = getKeysToLeaves(query.cat_keys)

        const { data } = await ApiService.queryItemsList({
          ...query,
          cat_keys: catsArr
        })

        set({ ...data })
      },
      onFinally: () => {
        set({ loading: false })
      }
    }),

  })
)

function getKeysToLeaves( obj: Record<string, any>, currentKeys: string[] = [] ): string[][] {
  const keysArray = []
  for (const key in obj) {
    const newKeys = [...currentKeys, key]
    if (typeof obj[key] === 'object' && Object.keys(obj[key]).length > 0) {
      keysArray.push(...getKeysToLeaves(obj[key], newKeys))
    } else {
      keysArray.push(newKeys)
    }
  }
  return keysArray
}