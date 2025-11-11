'use client'

import { useCategoriesStore } from '@/shared/store/categories.store'
import { ItemCard, Pagination } from '@/shared/UI'

import c from './list.module.scss'


const List = () => {

  const list = useCategoriesStore(state => state.list)
  const pages = useCategoriesStore(state => state.pages)
  const page = useCategoriesStore(state => state.page)

  const choosePage = ( page: number ) => {
    useCategoriesStore.getState().setQueryParams({ page })
    useCategoriesStore.getState().queryItemsList()
  }

  return (<>
    <div className={c.top} >
      <b>Найдено товаров {list.length}</b>
    </div>

    <div className={c.list} >
      
      {list.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}

    </div>

    <Pagination
      page={page}
      pages={pages}
      choosePage={choosePage}
      className={c.pagination}
    />
  </>)
}

export { List }