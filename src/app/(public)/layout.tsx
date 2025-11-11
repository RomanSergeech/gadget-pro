'use client'

import { useMainStore } from "@/shared/store/mian.store"
import { Alert } from "@/shared/UI/alert/Alert"
import { Footer, Header } from "@/widgets"

import { useEffect, type PropsWithChildren } from "react"


const Layout = ({ children }: PropsWithChildren) => {

  useEffect(() => {
    useMainStore.getState().queryMainData()
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