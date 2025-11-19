import { create } from 'zustand'
import { tryCatch } from '../utils'
import ApiService from '../api/api.service'

import type { TItem } from '../types/item.type'
import { useMainStore } from './mian.store'


interface TState {
  item: TItem | null
  loading: boolean
}

interface TStore extends TState {
  queryItemData: ( item_id: string ) => void
}

const initialState: TState = {
  item: null,
  loading: true
}

export const useItemStore = create<TStore>(
  (set) => ({
    ...initialState,

    queryItemData: ( item_id ) => tryCatch({
      callback: async () => {
        set({ loading: true })

        const { data } = await ApiService.queryItemData({ item_id })

        useMainStore.getState().queryRecentItems()

        set({
          item: data.item
        })
      },
      onFinally: () => {
        set({ loading: false })
      }
    }),

  })
)
