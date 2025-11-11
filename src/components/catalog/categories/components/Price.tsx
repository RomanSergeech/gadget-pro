'use client'

import { useCategoriesStore } from '@/shared/store/categories.store'
import { Checkbox, Input } from '@/shared/UI'

import type { TQueryItemsListRequest } from '@/shared/types/api.types'

import c from '../categories.module.scss'

interface Props {
}
const Price = ({  }: Props) => {

  const pricemin = useCategoriesStore(state => state.query.pricemin)
  const pricemax = useCategoriesStore(state => state.query.pricemax)
  const pricesort = useCategoriesStore(state => state.query.pricesort)

  const onBlur = ( e: React.ChangeEvent<HTMLInputElement>, key: 'pricemin'|'pricemax' ) => {
    useCategoriesStore.getState().setQueryParams({ [key]: e.target.value })
  }

  const choosePriseSort = ( order: TQueryItemsListRequest['pricesort'] ) => {
    if ( pricesort === order ) {
      useCategoriesStore.getState().setQueryParams({ pricesort: undefined })
    } else {
      useCategoriesStore.getState().setQueryParams({ pricesort: order })
    }
  }

  return (
    <div className={c.price} >
      
      <div>
        <span>от</span>

        <Input
          defaultValue={pricemin}
          onBlur={e => onBlur(e, 'pricemin')}
          number
        />

        <span>до</span>

        <Input
          defaultValue={pricemax}
          onBlur={e => onBlur(e, 'pricemax')}
          number
        />
      </div>

      <button onClick={() => choosePriseSort('asc')} >
        <Checkbox checked={pricesort === 'asc'} onChange={()=>{}} />
        Сначала дешевле
      </button>

      <button onClick={() => choosePriseSort('desc')} >
        <Checkbox checked={pricesort === 'desc'} onChange={()=>{}} />
        Сначала дороже
      </button>
      
    </div>
  )
}

export { Price }