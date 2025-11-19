import dynamic from "next/dynamic"

import type { Metadata } from "next"

const CartPageLazy = dynamic(() => import('@/components/cart/CartPage'))

export const metadata: Metadata = {
  title: 'Корзина',
}

const Page = () => {
  return <CartPageLazy />
}

export default Page