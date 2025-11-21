import { Suspense, use } from "react"
import { ItemCardPage } from "@/components/item-card/ItemCardPage"
import ApiService from "@/shared/api/api.service"
import { Loader } from "@/shared/UI"

import type { Metadata } from "next"


interface MetadataProps {
  params: Promise<{
    item_id: string
  }>
}
export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { item_id } = await params
  const { data } = await ApiService.queryItemMetadata({ item_id })
  return {
    title: data.meta.title,
    description: data.meta.description
  }
}

const Page = ({ params }: { params: Promise<{ item_id: string }> }) => {
  const { item_id } = use(params)
  return (
    <Suspense fallback={<Loader />} >
      <ItemCardPage item_id={item_id} />
    </Suspense>
  )
}

export default Page