import { useAdminStore } from '@/shared/store/admin.store'

import type { TCategory } from '@/shared/types/category.types'

import c from './categories.module.scss'


interface Props {
 
}
const Categories = ({  }: Props) => {

  const categories = useAdminStore(state => state.categories)

  return (
    <div className={c.categories} >
      
      {categories.arr.map(getCategory)}

    </div>
  )
}

const getCategory = ( category: TCategory ) => {
  return (
    <ul key={category.key} >
      <li>{category.value}</li>
      {category.children.map(getCategory)}
    </ul>
  )
}

export { Categories }