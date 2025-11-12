'use client'

import { useEffect, useState } from 'react'
import { useMainStore } from '@/shared/store/mian.store'
import { useCategoriesStore } from '@/shared/store/categories.store'
import { usePathname, useSearchParams } from 'next/navigation'
import { Category } from './components/Category'
import { Price } from './components/Price'
import { useDebounce } from '@/shared/hooks'
import { Availability } from './components/Availability'

import type { TQueryItemsListRequest } from '@/shared/types/api.types'

import c from './categories.module.scss'


const Categories = () => {
  
  const categories = useMainStore(state => state.categories)
  const query = useCategoriesStore(state => state.query)

  const [active, setActive] = useState(false)

  const debouncedSearchValue = useDebounce(query, 500)

  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    if ( categories ) {
      const params = new URLSearchParams(searchParams)
      const cats = params.get('categories')?.split(',')
      const page = params.get('page') || undefined
      const pricemin = params.get('pricemin') || undefined
      const pricemax = params.get('pricemax') || undefined
      const pricesort = (params.get('pricesort') as TQueryItemsListRequest['pricesort']) || undefined
      const available = (params.get('available') as TQueryItemsListRequest['available']) || undefined
      
      useCategoriesStore.getState().setQueryParams({
        page: +(page||1),
        cat_keys: cats || [],
        pricemin: pricemin ? +pricemin : undefined,
        pricemax: pricemax ? +pricemax : undefined,
        pricesort,
        available
      })
    }

    return () => {
      useCategoriesStore.setState({ list: [], query: {} })
    }
  }, [])

  useEffect(() => {
    if ( debouncedSearchValue && Object.keys(debouncedSearchValue).length > 0 ) {

      useCategoriesStore.getState().queryItemsList()

      const params = new URLSearchParams(searchParams)

      const { cat_keys, pricemin, pricemax, pricesort, available, page } = debouncedSearchValue

      if ( !cat_keys || cat_keys?.length === 0 || cat_keys[0] === '' ) params.delete('categories')
      else params.set('categories', cat_keys.join(','))

      if ( page ) params.set('page', ''+page)
      else params.delete('page')

      if ( pricemin ) params.set('pricemin', ''+pricemin)
      else params.delete('pricemin')

      if ( pricemax ) params.set('pricemax', ''+pricemax)
      else params.delete('pricemax')

      if ( pricesort ) params.set('pricesort', pricesort)
      else params.delete('pricesort')

      if ( available ) params.set('available', available)
      else params.delete('available')

      const url = `${pathname}?${params.toString()}`
      window.history.pushState({path:url}, '', url)
    }
  }, [debouncedSearchValue])

  return (
    <aside
      className={c.categories}
      data-active={active}
    >
      <div className={c.category} >
        <div
          className={c.category_top}
          onClick={() => setActive(p => !p)}
        >
          <b>Категория товара</b>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.293 9.29297L12 13.586L7.70697 9.29297L6.29297 10.707L12 16.414L17.707 10.707L16.293 9.29297Z" fill="#0D0D0D"/></svg>
        </div>
        {categories.arr.map(cat => (
          <Category
            key={cat.id}
            category={cat}
            parent_cat_key={undefined}
          />
        ))}
      </div>

      <div className={c.category} >
        <b>Цена</b>
        <Price />
      </div>

      <div className={c.category} >
        <b>Наличие</b>
        <Availability />
      </div>

    </aside>
  )
}



export { Categories }