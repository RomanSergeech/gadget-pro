import { Categories } from './categories/Categories'
import { List } from './list/List'

import c from './catalog.module.scss'


const CatalogPage = () => {
  return (
    <div className={c.page_body} >
      
      <Categories />

      <List />

    </div>
  )
}

export { CatalogPage }