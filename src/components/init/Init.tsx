'use client'

import { useEffect } from 'react'
import { useMainStore } from '@/shared/store/mian.store'
import { useCartStore } from '@/shared/store/cart.store'


const Init = () => {

  useEffect(() => {
    useMainStore.getState().queryMainData()
    useCartStore.getState().loadCartItems()
  }, [])

  return null
}

export { Init }