import { Suspense } from 'react'
import { Loader } from '@/shared/UI'
import { Categories } from './categories/Categories'
import { List } from './list/List'

import c from './catalog.module.scss'


const CatalogPage = () => {
  return (
    <div className={c.page_body} >
      
      <Categories />

      <Suspense fallback={<Loader />} >
        <List />
      </Suspense>

    </div>
  )
}

export { CatalogPage }