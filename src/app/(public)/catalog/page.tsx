import { Suspense } from "react"
import { CatalogPage } from "@/components"
import { Loader } from "@/shared/UI"

const Page = () => {
  return (
    <Suspense fallback={<Loader fontSize={16} fullScreen />}>
      <CatalogPage />
    </Suspense>
  )
}

export default Page