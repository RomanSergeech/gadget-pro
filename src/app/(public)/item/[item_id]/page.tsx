import { Suspense, use } from "react"
import { ItemCardPage } from "@/components/item-card/ItemCardPage"
import { Loader } from "@/shared/UI"


const Page = ({ params }: { params: Promise<{ item_id: string }> }) => {
  const { item_id } = use(params)
  return (
    <Suspense fallback={<Loader fullScreen />} >
      <ItemCardPage item_id={item_id} />
    </Suspense>
  )
}

export default Page