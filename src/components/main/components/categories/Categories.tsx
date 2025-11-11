import { useMainStore } from '@/shared/store/mian.store'
import { CategoryCard } from '@/shared/UI'

import c from './categories.module.scss'


const Categories = () => {

  const categories = useMainStore(state => state.categories_list)

  return (
    <div className={c.categories} >

      {categories.map(el => (
        <CategoryCard
          key={el.id}
          category={el}
        />
      ))}

    </div>
  )
}

export { Categories }