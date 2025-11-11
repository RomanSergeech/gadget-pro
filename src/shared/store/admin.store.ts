import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import ApiService from '../api/api.service'
import { tryCatch } from '../utils'

import type { TDeleteCategoryRequest, TDeleteItemRequest, TLoginRequest } from '../types/api.types'
import type { TNewsItem } from '../types/news.types'
import type { TCategoriesList } from '../types/category.types'
import type { TItem } from '../types/item.type'
import type { TSlide } from '../types/slide.types'


interface TState {
  isAuth: boolean
  loading: boolean
  items: TItem[],
  slides: TSlide[]
  categories: TCategoriesList
  news: TNewsItem[]
}

interface TStore extends TState {
  checkAuth: () => void
  login: ( reqData: TLoginRequest ) => Promise<void>
  logout: () => void
  queryAdminData: () => Promise<void>
  addItem: ( formData: FormData ) => Promise<void>
  editItem: ( formData: FormData ) => Promise<void>
  deleteItem: ( sendData: TDeleteItemRequest ) => Promise<void>
  addCategory: ( formData: FormData ) => Promise<void>
  editCategory: ( formData: FormData ) => Promise<void>
  deleteCategory: ( sendData: TDeleteCategoryRequest ) => Promise<void>
}

const initialState: TState = {
  isAuth: false,
  loading: true,
  items: [],
  slides: [],
  news: [],
  categories: { arr: [], obj: {} },
}

export const useAdminStore = create(
  devtools<TStore>((set) => ({
    ...initialState,

    checkAuth: () => tryCatch({
      callback: async () => {
        set({ loading: true })

        await ApiService.checkAuth()

        set({
          isAuth: true
        })
      },
      onError: () => {
        localStorage.removeItem('token')
      },
      onFinally: () => {
        set({ loading: false })
      }
    }),

    login: ( reqData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.login(reqData)
  
        localStorage.setItem('token', data.access_token)
  
        set({
          isAuth: true
        })
      }
    }),

    logout: () => tryCatch({
      callback: async () => {
        localStorage.clear()
        sessionStorage.clear()
        set({ ...initialState })
      }
    }),

    queryAdminData: () => tryCatch({
      callback: async () => {

        const items = await ApiService.queryItemsList({})

        const categories = await ApiService.queryCategoriesList()

        set({
          items: items.data.list,
          categories: categories.data.list
        })
      }
    }),

    addItem: ( formData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.addItem(formData)

        set({
          items: data.list
        })
      }
    }),

    editItem: ( formData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.editItem(formData)

        set({
          items: data.list
        })
      }
    }),

    deleteItem: ( sendData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.deleteItem(sendData)

        set({
          items: data.list
        })
      }
    }),

    addCategory: ( formData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.addCategory(formData)

        set({
          categories: data.list
        })
      }
    }),

    editCategory: ( formData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.editCategory(formData)

        set({
          categories: data.list
        })
      }
    }),

    deleteCategory: ( sendData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.deleteCategory(sendData)

        set({
          categories: data.list
        })
      }
    }),

  }))
)
