import { create } from 'zustand'
import { tryCatch } from '../utils'
import ApiService from '../api/api.service'

import type { TItem } from '../types/item.type'


interface TState {
  items: TItem[]
  items_ids: string[]
  loading: boolean
}

interface TStore extends TState {
  loadCartItems: () => void
  addToCart: ( item_id: string ) => void
  deleteFromCart: ( item_id: string ) => void
}

const initialState: TState = {
  items: [],
  items_ids: [],
  loading: true
}

export const useCartStore = create<TStore>(
  (set, get) => ({
    ...initialState,

    loadCartItems: () => tryCatch({
      callback: async () => {
        set({ loading: true })

        const ids = JSON.parse(localStorage.getItem('cart') || '[]')

        const { data } = await ApiService.queryItemsList({ ids })

        set({
          items: data.list,
          items_ids: ids
        })
      },
      onFinally: () => {
        set({ loading: false })
      }
    }),

    addToCart: ( item_id ) => tryCatch({
      callback: async () => {

        const ids = [...get().items_ids]

        ids.push(item_id)

        const { data } = await ApiService.queryItemsList({ ids })

        localStorage.setItem('cart', JSON.stringify(ids))

        set({
          items: data.list,
          items_ids: ids
        })
      }
    }),

    deleteFromCart: ( item_id ) => tryCatch({
      callback: async () => {

        const ids = get().items_ids.filter(id => id !== item_id)

        const { data } = await ApiService.queryItemsList({ ids })

        localStorage.setItem('cart', JSON.stringify(ids))

        set({
          items: data.list,
          items_ids: ids
        })
      }
    }),

  })
)
