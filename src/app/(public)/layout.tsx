'use client'

import { useLayoutEffect } from "react"
import { useCartStore } from "@/shared/store/cart.store"
import { useMainStore } from "@/shared/store/mian.store"
import { Footer, Header } from "@/widgets"
import { Alert } from "@/shared/UI/alert/Alert"

import type { PropsWithChildren } from "react"


const Layout = ({ children }: PropsWithChildren) => {

  useLayoutEffect(() => {
    useMainStore.getState().queryMainData()
    useCartStore.getState().loadCartItems()
  }, [])

  return (
    <>
      <Header />
      {children}
      <Footer />
      <Alert />
    </>
  )
}

export default Layout