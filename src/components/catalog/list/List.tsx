'use client'

import { useCategoriesStore } from '@/shared/store/categories.store'
import { ItemCard, Loader, Pagination } from '@/shared/UI'

import c from './list.module.scss'


const List = () => {

  const loading = useCategoriesStore(state => state.loading)
  const list = useCategoriesStore(state => state.list)
  const pages = useCategoriesStore(state => state.pages)
  const page = useCategoriesStore(state => state.page)

  const choosePage = ( page: number ) => {
    useCategoriesStore.getState().setQueryParams({ page })
  }

  return (<>
    <div className={c.top} >
      {!loading && <b>Найдено товаров {list.length}</b>}
      {loading && <Loader fontSize={10} />}
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