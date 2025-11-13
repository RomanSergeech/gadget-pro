import { ItemCardPage } from "@/components"
import { Loader } from "@/shared/UI"
import { Suspense, use } from "react"

const Page = ({ params }: { params: Promise<{ item_id: string }> }) => {
  const { item_id } = use(params)
  return <Suspense fallback={<Loader fullScreen />} >
    <ItemCardPage item_id={item_id} />
  </Suspense>
}

export default Page