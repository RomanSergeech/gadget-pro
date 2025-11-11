import { Checkbox } from '@/shared/UI'
import { useCategoriesStore } from '@/shared/store/categories.store'

import type { TCategory } from '@/shared/types/category.types'

interface Props {
  category: TCategory
  parent_cat_key: string|undefined
}
const Category = ({ category, parent_cat_key }: Props) => {

  const query = useCategoriesStore(state => state.query)

  const activateCategory = ( cat?: TCategory ) => {
    if ( !cat ) return
    const index = query.cat_keys?.findIndex(el => el === cat.key)
    const cat_keys = query.cat_keys
    if ( index !== -1 && cat_keys ) {
      const index = cat_keys.findIndex(el => el === cat.key)
      if ( index !== -1 ) {
        cat_keys.splice(index, 1)
      }
      const all_keys = cat.children.reduce<string[]>(getKeys, [])
      all_keys.forEach(key => {
        const index = cat_keys.findIndex(el => el === key)
        if ( index !== -1 ) {
          cat_keys.splice(index, 1)
        }
      })
      useCategoriesStore.getState().setQueryParams({ cat_keys })
      return
    }
    cat.all_parents.forEach(key => {
      const index = cat_keys?.findIndex(el => el === key)
      console.log(cat_keys, index);
      if ( index === -1 ) {
        cat_keys?.push(key)
      }
    })
    if ( index === -1 ) {
      cat_keys?.push(cat.key)
    }
    useCategoriesStore.getState().setQueryParams({ cat_keys })
  }

  return (
    <ul>
      <li data-active={query.cat_keys?.includes(category.key)} >
        <button onClick={() => activateCategory(category)} >
          <Checkbox checked={query.cat_keys?.includes(category.key)} onChange={()=>{}} />
          {category.value}
          <span>{`[${category.items_count}]`}</span>
        </button>
      </li>

      {category.children.map(cat => (
        <Category
          key={cat.id}
          category={cat}
          parent_cat_key={parent_cat_key}
        />
      ))}
    </ul>
  )
}

function getKeys( acc: string[], cat: TCategory ): string[] {
  acc.push(cat.key)
  if ( cat?.children.length === 0 ) {
    return acc
  }
  const arr = cat.children.reduce<string[]>((acc, c) => {
    return getKeys(acc, c)
  }, [])
  arr.forEach(el => {
    acc.push(el)
  })
  return acc
}

export { Category }