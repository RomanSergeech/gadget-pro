import { create } from 'zustand'
import ApiService from '../api/api.service'
import { tryCatch } from '../utils'

import type { TDeleteCategoryRequest, TDeleteItemRequest, TDeleteNewsItemRequest, TDeleteOrderRequest, TEditCommonDataRequest, TEditCommonDataResponse, TLoginRequest } from '../types/api.types'
import type { TNewsItem } from '../types/news.types'
import type { TCategoriesList } from '../types/category.types'
import type { TItem } from '../types/item.type'
import type { TSlide } from '../types/slide.types'
import type { TOrder } from '../types/order.types'


interface TState {
  isAuth: boolean
  loading: boolean
  items: TItem[],
  slides: TSlide[]
  categories: TCategoriesList
  news: TNewsItem<'admin'>[]
  common: TEditCommonDataResponse
  orders: TOrder[]
}

interface TStore extends TState {
  checkAuth: () => void
  login: ( reqData: TLoginRequest ) => Promise<void>
  logout: () => void
  editCommonData: ( sendData: TEditCommonDataRequest ) => Promise<void>
  queryAdminData: () => Promise<void>
  addItem: ( formData: FormData ) => Promise<void>
  editItem: ( formData: FormData ) => Promise<void>
  deleteItem: ( sendData: TDeleteItemRequest ) => Promise<void>
  addCategory: ( formData: FormData ) => Promise<void>
  editCategory: ( formData: FormData ) => Promise<void>
  deleteCategory: ( sendData: TDeleteCategoryRequest ) => Promise<void>
  addNewsItem: ( formData: FormData ) => Promise<void>
  editNewsItem: ( formData: FormData ) => Promise<void>
  deleteNewsItem: ( sendData: TDeleteNewsItemRequest ) => Promise<void>
  deleteOrder: ( sendData: TDeleteOrderRequest ) => Promise<void>
}

const initialState: TState = {
  isAuth: false,
  loading: true,
  items: [],
  slides: [],
  news: [],
  categories: { arr: [], obj: {} },
  common: {
    payinfo: '',
    about: '',
    phones: '',
    address: ''
  },
  orders: []
}

export const useAdminStore = create<TStore>(
  (set) => ({
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
    
    editCommonData: ( sendData ) => tryCatch({
      callback: async () => {

        await ApiService.editCommonData(sendData)

      }
    }),

    queryAdminData: () => tryCatch({
      callback: async () => {

        const orders = await ApiService.getOrdersList()

        set({
          orders: orders.data.orders
        })

        const items = await ApiService.queryItemsList({})

        const news = await ApiService.queryNewsList<'admin'>({ admin: true })

        const data = await ApiService.queryMainData()

        set({
          items: items.data.list,
          categories: data.data.categories.list,
          common: data.data.common,
          news: news.data.list
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
    
    addNewsItem: ( formData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.addNewsItem(formData)

        set({
          news: data.list
        })
      }
    }),

    editNewsItem: ( formData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.editNewsItem(formData)

        set({
          news: data.list
        })
      }
    }),

    deleteNewsItem: ( sendData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.deleteNewsItem(sendData)

        set({
          news: data.list
        })
      }
    }),

    deleteOrder: ( sendData ) => tryCatch({
      callback: async () => {

        const { data } = await ApiService.deleteOrder(sendData)

        set({
          orders: data.orders
        })
      }
    }),

  })
)
