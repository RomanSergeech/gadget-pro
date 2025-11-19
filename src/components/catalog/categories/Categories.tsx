'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMainStore } from '@/shared/store/mian.store'
import { useCategoriesStore } from '@/shared/store/categories.store'
import { Category } from './components/Category'
import { Price } from './components/Price'
import { useDebounce } from '@/shared/hooks'
import { Availability } from './components/Availability'

import c from './categories.module.scss'


const Categories = () => {
  
  const categories = useMainStore(state => state.categories)
  const query = useCategoriesStore(state => state.query)

  const [active, setActive] = useState(false)

  const debouncedSearchValue = useDebounce(query, 500)

  const searchParams = useSearchParams()

  useEffect(() => {
    return () => {
      useCategoriesStore.setState({ list: [], query: { cat_keys: {} } })
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams || '')
    const categoryParam = params.get('category') || undefined

    if ( debouncedSearchValue && Object.keys(debouncedSearchValue).length > 0 && !categoryParam ) {
      useCategoriesStore.getState().queryItemsList()
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