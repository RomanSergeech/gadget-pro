import { useMainStore } from "../store/mian.store"

import type { TCategoriesList } from "../types/category.types"

export const Pages = {
  main: '/',
  catalog: ( cat_key?: string ) => {
    let url = '/catalog'
    if ( cat_key ) {
      url += '?categories=' + getCategories(cat_key, useMainStore.getState().categories)
    }
    return url
  },
  item: ( item_id: string|number ) => `/item/${item_id}`,
  cart: '/cart',
  news: '/news',
  payinfo: '/payinfo',
  about: '/about',
  contact: '/contact',
  policy: '/policy',
}

const getCategories = ( cat_key: string, categories: TCategoriesList ) => {
  const arr: string[] = [cat_key]
  const cat = categories.obj[cat_key]
  
  cat?.all_parents.forEach(key => {
    arr.push(key)
  })
  return arr.join('%2C')
}

const getParents = () => {

}
