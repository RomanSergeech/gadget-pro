'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Pages } from '@/shared/config/pages.config'
import { Items, OrderModal, Table } from '@/widgets'
import { useCartStore } from '@/shared/store/cart.store'
import { cn, getPrice } from '@/shared/utils'
import { ItemAvailability } from '@/shared/config/items.config'
import { DeleteButton } from './components/DeleteButton'
import { useMainStore } from '@/shared/store/mian.store'

import c from './cartPage.module.scss'
import { Button } from '@/shared/UI'


const CartPage = () => {
  
  const recent = useMainStore(state => state.recent)
  const loading = useCartStore(state => state.loading)
  const list = useCartStore(state => state.items)

  const [countItems, setCountItems] = useState<Record<string, { id: string, count: number }>>({})

  const amount = list.reduce<number>((acc, item) => {
    acc += item.price * (countItems[item.id]?.count || 1)
    return acc
  }, 0)

  const items_count = list.reduce<number>((acc, item) => {
    acc += countItems[item.id]?.count || 1
    return acc
  }, 0)

  const increaseCount = ( id: string, count: number|undefined ) => {
    setCountItems(prev => {
      const item = prev[id]
      if ( count === 100 ) return prev
      if ( !item ) prev[id] = { id, count: 2 }
      else prev[id] = { id, count: (count||1) + 1 }
      return structuredClone(prev)
    })
  }

  const decreaseCount = ( id: string, count: number|undefined ) => {
    setCountItems(prev => {
      const item = prev[id]
      if ( !item || count === 1 || count === undefined ) prev[id] = { id, count: 1 }
      else prev[id] = { id, count: (count||0) - 1 }
      return {...prev}
    })
  }

  const inputCount = ( e: React.ChangeEvent<HTMLInputElement>, id: string ) => {
    setCountItems(prev => {
      const value = e.target.value
      if ( value !== '0' || /^\d+$/.test(value) ) {
        const num = +value
        if ( num > 100 || num < 0 ) {
          return {...prev}
        }
        const item = prev[id]
        if ( !item ) prev[id] = { id, count: num }
        else prev[id] = { id, count: num }
      }
      return {...prev}
    })
  }

  return (
    <div className={c.page_body} >
      
      <div className={c.top} >
        <ul>
          <li><Link href={Pages.catalog()} >Каталог</Link></li>
          <li><b>Корзина</b></li>
        </ul>
      </div>

      <Table
        titles={{
          titles: [
            { value: 'Продукт' },
            { value: 'Цена' },
            { value: 'Количество' },
            { value: 'Итог' },
            { value: 'Действия' },
          ]
        }}
        columns={() => list?.map((item) => (
          <ul key={item.id} >
            <li className={c.product} >
              {item.preview &&
                <div className={c.image_wrapper} >
                  <img src={item.preview} />
                </div>
              }
              <Link href={Pages.item(item.item_id)} >{item.name}</Link>
              <span data-available={item.available} >
                {ItemAvailability[item.available as keyof typeof ItemAvailability]?.value}
              </span>
            </li>
            <li>{getPrice(item.price)}</li>
            <li className={c.count} >
              <div>
                <button onClick={() => decreaseCount(item.id, countItems[item.id]?.count)} >-</button>
                <input
                  type='text'
                  value={countItems[item.id]?.count || 1}
                  onChange={e => inputCount(e, item.id)}
                />
                <button onClick={() => increaseCount(item.id, countItems[item.id]?.count)} >+</button>
              </div>
            </li>
            <li className={c.amount} >
              {getPrice(item.price * (countItems[item.id]?.count || 1))}
            </li>
            <li className={c.btns} >
              <DeleteButton id={item.id} />
            </li>
          </ul>
        ))}
        total={(t) => (
          <ul className={t.total} >
            <li></li>
            <li></li>
            <li className={cn(c.count, c.total_count)} >
              <div>
                <button></button>
                <input type="text" defaultValue={items_count} />
                <button></button>
              </div>
            </li>
            <li className={c.amount} >
              {getPrice(amount)}
            </li>
            <li className={c.btns} >
              <OrderModal
                countItems={countItems}
                items_count={items_count}
                amount={amount}
                button={(onClick) => <Button onClick={onClick} className={c.order_button} >Оформить</Button>}
              />
            </li>
          </ul>
        )}
        loading={loading}
        emptyData={list.length === 0}
        tableClassName={c.table}
      />

      <Items items={recent} />

    </div>
  )
}

export { CartPage }