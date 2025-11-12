import axios from "axios"

import type { AxiosResponse } from "axios"
import type { TAddCategoryResponse, TAddItemResponse, TCheckAuthResponse, TDeleteCategoryRequest, TDeleteCategoryResponse, TDeleteItemRequest, TDeleteItemResponse, TEditCategoryResponse, TEditCommonDataRequest, TEditCommonDataResponse, TEditItemResponse, TGetCategoriesListResponse, TGetMainDataResponse, TLoginRequest, TLoginResponse, TMakeOrderRequest, TMakeOrderResponse, TQueryItemDataRequest, TQueryItemDataResponse, TQueryItemsListRequest, TQueryItemsListResponse } from "../types/api.types"


const $api = axios.create({
  baseURL: 'https://w0wchmds-4500.euw.devtunnels.ms',
  withCredentials: true
})

$api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers.Domain = location.host
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

class ApiService {

  async login( reqData: TLoginRequest ) {
    return checkError(await $api.post<TLoginResponse>('/api/login', reqData))
  }

  async checkAuth() {
    return checkError(await $api.get<TCheckAuthResponse>('/api/refresh'))
  }

  async queryItemsList( sendData: TQueryItemsListRequest ) {
    return checkError(await $api.post<TQueryItemsListResponse>('/api/item/list', sendData))
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

  async queryItemData( sendData: TQueryItemDataRequest ) {
    return checkError(await $api.post<TQueryItemDataResponse>('/api/item/get', sendData))
  }

  async makeOrder( sendData: TMakeOrderRequest ) {
    return checkError(await $api.post<TMakeOrderResponse>('/api/order/add', sendData))
  }

  async editCommonData( sendData: TEditCommonDataRequest ) {
    return checkError(await $api.post<TEditCommonDataResponse>('/api/main/edit', sendData))
  }

}

export default new ApiService()