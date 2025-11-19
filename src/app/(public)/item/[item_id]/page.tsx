import { Suspense, use } from "react"
import { ItemCardPage } from "@/components/item-card/ItemCardPage"
import { Loader } from "@/shared/UI"
import ApiService from "@/shared/api/api.service"

import type { Metadata } from "next"


interface MetadataProps {
  params: Promise<{
    item_id: string
  }>
}
export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { item_id } = await params
  const { data } = await ApiService.queryItemData({ item_id })
  if ( !data.item.meta || data.item.meta.title === '' ) return { title: data.item.name }
  return {
    title: data.item.meta.title,
    description: data.item.meta.description,
  }
}

const Page = ({ params }: { params: Promise<{ item_id: string }> }) => {
  const { item_id } = use(params)
  return (
    <Suspense fallback={<Loader fullScreen />} >
      <ItemCardPage item_id={item_id} />
    </Suspense>
  )
}

export default Page