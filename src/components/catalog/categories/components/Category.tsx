import { useEffect } from 'react'
import { Checkbox } from '@/shared/UI'
import { useCategoriesStore, type TDeepObj } from '@/shared/store/categories.store'
import { usePathname, useSearchParams } from 'next/navigation'

import type { TCategory } from '@/shared/types/category.types'

interface Props {
  category: TCategory
  parent_cat_key: string|undefined
}
const Category = ({ category, parent_cat_key }: Props) => {

  const query = useCategoriesStore(state => state.query)

  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const categoryParam = params.get('category') || undefined
    if ( categoryParam && category.key === categoryParam ) {
      const cat_keys = {}
      addKeyToNestedObject(cat_keys, category.all_parents, category.key, {})
      useCategoriesStore.getState().setQueryParams({ cat_keys })
      activateCategory()
      params.delete('category')
      const url = `${pathname}?${params.toString()}`
      window.history.pushState({path:url}, '', url)
    }
  }, [])

  const activateCategory = () => {
    if ( !category ) return
    const cat_keys = useCategoriesStore.getState().query.cat_keys

    if ( hasKey(query.cat_keys, category.key) ) {
      removeKeyFromNestedObject(cat_keys, [...category.all_parents, category.key])
      useCategoriesStore.getState().setQueryParams({ cat_keys })
      return 
    }

    if ( category.parent_key ) {
      addKeyToNestedObject(cat_keys, category.all_parents, category.key, {})
    } else {
      cat_keys[category.key] = {}
    }

    useCategoriesStore.getState().setQueryParams({ cat_keys })
  }

  return (
    <ul>
      <li data-active={hasKey(query.cat_keys, category.key)} >
        <button onClick={() => activateCategory()} >
          <Checkbox checked={hasKey(query.cat_keys, category.key)} onChange={()=>{}} />
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

function hasKey( obj: TDeepObj | undefined, findKey: string ) {
  if ( !obj ) return false
  if (findKey in obj) {
    return true;
  }
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
        if ( hasKey(obj[key], findKey) ) {
          return true
        }
    }
  }
  return false
}

function removeKeyFromNestedObject(obj: TDeepObj, path: string[]): boolean {
  let current = obj;
  for (let i = 0; i < path.length; i++) {
    const key = path[i]!
    if (key in current) {
      if (i === path.length - 1) {
        delete current[key]
        return true
      } else {
        current = current[key] as TDeepObj
      }
    } else {
      return false
    }
  }
  return false
}

function addKeyToNestedObject(obj: TDeepObj, path: string[], newKey: string, value: any) {
  let current = obj;
  for (const key of path) {
    if (!(key in current)) {
      current[key] = {}
    }
    current = current[key] as TDeepObj
  }
  current[newKey] = value;
}

export { Category }