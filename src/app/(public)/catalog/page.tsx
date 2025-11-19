import { Suspense } from "react"
import { Loader } from "@/shared/UI"
import { CatalogPage } from "@/components/catalog/CatalogPage"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Каталог',
}

const Page = () => {
  return (
    <Suspense fallback={<Loader fontSize={16} fullScreen />}>
      <CatalogPage />
    </Suspense>
  )
}

export default Page