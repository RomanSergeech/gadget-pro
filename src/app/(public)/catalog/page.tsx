import { Suspense } from "react"
import { Loader } from "@/shared/UI"
import { CatalogPage } from "@/components/catalog/CatalogPage"

const Page = () => {
  return (
    <Suspense fallback={<Loader fontSize={16} fullScreen />}>
      <CatalogPage />
    </Suspense>
  )
}

export default Page