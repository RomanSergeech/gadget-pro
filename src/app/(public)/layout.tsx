import { Footer, Header } from "@/widgets"
import { Alert } from "@/shared/UI/alert/Alert"
import { Init } from "@/components/init/Init"

import type { PropsWithChildren } from "react"


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Init />
      <Header />
      {children}
      <Footer />
      <Alert />
    </>
  )
}

export default Layout