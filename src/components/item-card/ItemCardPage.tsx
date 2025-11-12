'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/shared/UI'
import { Gallery } from './components/Gallery'
import { Items, OrderModal } from '@/widgets'
import { useMainStore } from '@/shared/store/mian.store'
import { Pages } from '@/shared/config/pages.config'
import { useItemStore } from '@/shared/store/item.store'
import { ItemAvailability } from '@/shared/config/items.config'
import { getPrice } from '@/shared/utils'
import { useCartStore } from '@/shared/store/cart.store'

import c from './itemCard.module.scss'


interface Props {
  item_id: string
}
const ItemCardPage = ({ item_id }: Props) => {

  const categories = useMainStore(state => state.categories)
  const item = useItemStore(state => state.item)
  const items = useMainStore(state => state.popular)
  const inCart = useCartStore(state => state.items_ids.includes(item?.id||''))

  useEffect(() => {
    useItemStore.getState().queryItemData(item_id)
  }, [])

  const addToCart = () => {
    if ( !item ) return
    useCartStore.getState().addToCart(item.id)
  }

  const deleteFromCart = () => {
    if ( !item ) return
    useCartStore.getState().deleteFromCart(item.id)
  }

  return (
    <div className={c.page_body} >

      <div className={c.top} >
        <ul>
          <li><Link href={Pages.catalog()} >Каталог</Link></li>
          {item?.categories.map(cat_key => (
            <li key={cat_key} >
              <Link href={Pages.catalog(cat_key)} >
                {categories.obj[cat_key]?.value}
              </Link>
            </li>
          ))}
          <li>
            <b>{item?.name}</b>
          </li>
        </ul>
      </div>
      
      <Gallery />

      <div className={c.description_wrapper} >
        <h1>{item?.name}</h1>
        <p>Производитель: {item?.company_name}</p>
        {item?.available && <p>Остаток: {ItemAvailability[item.available]?.value}</p>}
        <p>{item?.description}</p>
      
        <div className={c.btns} >
          <p>{item?.price ? getPrice(item.price) : '---'}</p>
          {!inCart &&
            <Button onClick={addToCart} >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 3.33337H4.16667H3.33333H1.66667V5.00004H3.33333H3.58333L6.31833 12.5209C6.67583 13.505 7.62083 14.1667 8.6675 14.1667H15.8333V12.5H8.6675C8.31833 12.5 8.00333 12.2792 7.88417 11.9517L7.4775 10.8334H15.205C15.9467 10.8334 16.605 10.335 16.8075 9.62421L18.3017 4.39587C18.3733 4.14421 18.3225 3.87421 18.1658 3.66504C18.0075 3.45587 17.7608 3.33337 17.5 3.33337ZM15.205 9.16671H6.87167L5.35667 5.00004H16.3958L15.205 9.16671Z" fill="white"/><path d="M8.75 17.5C9.44033 17.5 10 16.9403 10 16.25C10 15.5597 9.44033 15 8.75 15C8.05964 15 7.5 15.5597 7.5 16.25C7.5 16.9403 8.05964 17.5 8.75 17.5Z" fill="white"/><path d="M13.75 17.5C14.4403 17.5 15 16.9403 15 16.25C15 15.5597 14.4403 15 13.75 15C13.0597 15 12.5 15.5597 12.5 16.25C12.5 16.9403 13.0597 17.5 13.75 17.5Z" fill="white"/></svg>
              Добавить
            </Button>
          }
          {inCart &&
            <Button onClick={deleteFromCart} className={c.in_cart_button} >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.57507 13.0606L4.37437 9.85986L3 11.2342L7.57507 15.8093L17.01 6.37437L15.6356 5L7.57507 13.0606Z" fill="white"/></svg>
              В корзине
            </Button>
          }
          {item &&
            <OrderModal
              countItems={{[item.id]: { id: item.id, count: 1 }}}
              items_count={1}
              amount={item.price}
              button={(onClick) => <Button onClick={onClick} className={c.order_button} >Купить в 1 клик</Button>}
            />
          }
        </div>
      </div>

      <div className={c.specs_wrapper} >
        <b>Характеристики:</b>
        <ul>
          {item?.specs.map(el => (
            <li key={el} >{el}</li>
          ))}
        </ul>
      </div>

      <Items
        items={items}
        className={c.items_wrapper}
      />

    </div>
  )
}

export { ItemCardPage }