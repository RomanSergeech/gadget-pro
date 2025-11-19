import Link from 'next/link'
import { Pages } from '@/shared/config/pages.config'
import { useCartStore } from '@/shared/store/cart.store'

import c from '../header.module.scss'


const Cart = () => {

  const items_ids = useCartStore(state => state.items_ids)

  const count = items_ids.length

  return (
    <Link href={Pages.cart} className={c.cart_button} >
      <p>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.25 5H6.25H5H2.5V7.5H5H5.375L9.4775 18.7812C10.0137 20.2575 11.4312 21.25 13.0013 21.25H23.75V18.75H13.0013C12.4775 18.75 12.005 18.4187 11.8263 17.9275L11.2162 16.25H22.8075C23.92 16.25 24.9075 15.5025 25.2113 14.4362L27.4525 6.59375C27.56 6.21625 27.4837 5.81125 27.2487 5.4975C27.0112 5.18375 26.6413 5 26.25 5ZM22.8075 13.75H10.3075L8.035 7.5H24.5938L22.8075 13.75Z" fill="#D60000"/><path d="M13.125 26.25C14.1605 26.25 15 25.4105 15 24.375C15 23.3395 14.1605 22.5 13.125 22.5C12.0895 22.5 11.25 23.3395 11.25 24.375C11.25 25.4105 12.0895 26.25 13.125 26.25Z" fill="#D60000"/><path d="M20.625 26.25C21.6605 26.25 22.5 25.4105 22.5 24.375C22.5 23.3395 21.6605 22.5 20.625 22.5C19.5895 22.5 18.75 23.3395 18.75 24.375C18.75 25.4105 19.5895 26.25 20.625 26.25Z" fill="#D60000"/></svg>
        {count > 0 && <span className={c.num}> <span>(</span> {count} <span>)</span> </span>}
      </p>
      {count === 0 && <span>Корзина</span>}
      {count > 0 && <span>В корзине <span className={c.num}> <span>(</span> {count} <span>)</span> </span></span>}
    </Link>
  )
}

export { Cart }