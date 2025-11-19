import axios from "axios"

import type { AxiosResponse } from "axios"
import type { TAddCategoryResponse, TAddItemResponse, TAddNewsItemResponse, TCheckAuthResponse, TDeleteCategoryRequest, TDeleteCategoryResponse, TDeleteItemRequest, TDeleteItemResponse, TDeleteNewsItemRequest, TDeleteNewsItemResponse, TEditCategoryResponse, TEditCommonDataRequest, TEditCommonDataResponse, TEditItemResponse, TEditNewsItemResponse, TGetCategoriesListResponse, TGetMainDataResponse, TGetNewsItemRequest, TGetNewsItemResponse, TGetNewsListRequest, TGetNewsListResponse, TLoginRequest, TLoginResponse, TMakeOrderRequest, TMakeOrderResponse, TQueryItemDataRequest, TQueryItemDataResponse, TQueryItemsListRequest, TQueryItemsListResponse, TQueryRecentItemsRequest, TQueryRecentItemsResponse, TSearchItemsRequest, TSearchItemsResponse } from "../types/api.types"


const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  withCredentials: true
})

$api.interceptors.request.use(config => {

  if (typeof window !== 'undefined') {
    const token = localStorage?.getItem('token')
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.Domain = location.host
    }
  }

  return config
})

type TError = {
  status: 'error',
  description: string
}

const checkError = <T>( res: AxiosResponse<T> ): AxiosResponse<T> => {
  const data = res.data as TError
  if ( data?.status === 'error' ) {
    throw data.description
  }
  return res
}

class Service {

  async login( reqData: TLoginRequest ) {
    return checkError(await $api.post<TLoginResponse>('/api/login', reqData))
  }

  async checkAuth() {
    return checkError(await $api.get<TCheckAuthResponse>('/api/refresh'))
  }

  async queryItemsList( sendData: TQueryItemsListRequest ) {
    return checkError(await $api.post<TQueryItemsListResponse>('/api/item/list', sendData))
  }

  async getItemsId() {
    return checkError(await $api.get<{ items_id: string[] }>('/api/item/list/id'))
  }

  async addItem( formData: FormData ) {
    return checkError(await $api.post<TAddItemResponse>('/api/item/add', formData))
  }

  async editItem( formData: FormData ) {
    return checkError(await $api.post<TEditItemResponse>('/api/item/edit', formData))
  }

  async deleteItem( sendData: TDeleteItemRequest ) {
    return checkError(await $api.post<TDeleteItemResponse>('/api/item/delete', sendData))
  }

  async queryCategoriesList() {
    return checkError(await $api.get<TGetCategoriesListResponse>('/api/category/list'))
  }

  async addCategory( formData: FormData ) {
    return checkError(await $api.post<TAddCategoryResponse>('/api/category/add', formData))
  }

  async editCategory( formData: FormData ) {
    return checkError(await $api.post<TEditCategoryResponse>('/api/category/edit', formData))
  }

  async deleteCategory( sendData: TDeleteCategoryRequest ) {
    return checkError(await $api.post<TDeleteCategoryResponse>('/api/category/delete', sendData))
  }

  async queryMainData() {
    return checkError(await $api.post<TGetMainDataResponse>('/api/main'))
  }

  async queryRecentItems( sendData: TQueryRecentItemsRequest ) {
    return checkError(await $api.post<TQueryRecentItemsResponse>('/api/item/recent', sendData))
  }

  async queryItemData( sendData: TQueryItemDataRequest ) {
    return checkError(await $api.post<TQueryItemDataResponse>('/api/item/get', sendData))
  }

  async makeOrder( sendData: TMakeOrderRequest ) {
    return checkError(await $api.post<TMakeOrderResponse>('/api/order/add', sendData))
  }

  async editCommonData( sendData: TEditCommonDataRequest ) {
    return checkError(await $api.post<TEditCommonDataResponse>('/api/main/edit', sendData))
  }

  async searchItems( sendData: TSearchItemsRequest ) {
    return checkError(await $api.post<TSearchItemsResponse>('/api/search', sendData))
  }

  async queryNewsList<T extends 'admin'|'cutted' = 'cutted'>( sendData: TGetNewsListRequest ) {
    return checkError(await $api.post<TGetNewsListResponse<T>>('/api/news/list', sendData))
  }

  async getNewsItem( sendData: TGetNewsItemRequest ) {
    return checkError(await $api.post<TGetNewsItemResponse>('/api/news/get', sendData))
  }

  async addNewsItem( formData: FormData ) {
    return checkError(await $api.post<TAddNewsItemResponse>('/api/news/add', formData))
  }

  async editNewsItem( formData: FormData ) {
    return checkError(await $api.post<TEditNewsItemResponse>('/api/news/edit', formData))
  }

  async deleteNewsItem( sendData: TDeleteNewsItemRequest ) {
    return checkError(await $api.post<TDeleteNewsItemResponse>('/api/news/delete', sendData))
  }

}

const ApiService = new Service()

export default ApiService