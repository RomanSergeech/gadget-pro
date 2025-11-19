import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/shared/UI'
import { ItemAvailability, ItemLabels } from '@/shared/config/items.config'
import { getPrice } from '@/shared/utils'
import { Pages } from '@/shared/config/pages.config'
import { useCartStore } from '@/shared/store/cart.store'

import type { TItem } from '@/shared/types/item.type'

import c from './itemCard.module.scss'


interface Props {
  item: TItem
  showLabel?: true
}
const ItemCard = ({ item, showLabel }: Props) => {

  const inCart = useCartStore(state => state.items_ids.includes(item.id))

  const label = Object.keys(ItemLabels).find(key => item.tags.includes(key)) as keyof typeof ItemLabels

  const addToCart = () => {
    useCartStore.getState().addToCart(item.id)
  }

  const deleteFromCart = () => {
    useCartStore.getState().deleteFromCart(item.id)
  }

  return (
    <div className={c.item_card} data-new={label} >

      {showLabel && label &&
        <label
          style={{
            backgroundColor: ItemLabels[label]?.bgColor,
            color: ItemLabels[label]?.textColor
          }}
        >
          {ItemLabels[label]?.value}
        </label>
      }

      <Link href={Pages.item(item.item_id)} className={c.image_wrapper} >
        <Image
          src={item.preview || ''}
          alt={item.name}
          width={250}
          height={200}
          loading='lazy'
        />
      </Link>

      <Link href={Pages.item(item.item_id)} className={c.item_name} >{item.name}</Link>

      <div className={c.info} >
        <p>Производитель: {item.company_name}</p>
        <p>Остаток: <span data-available={item.available} >{ItemAvailability[item.available]?.value}</span></p>
      </div>

      <div className={c.btns} >
        <p className={c.price} >{getPrice(item.price)}</p>
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
      </div>

    </div>
  )
}

export { ItemCard }