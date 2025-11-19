import { Suspense, use } from "react"
import { Loader } from "@/shared/UI"
import { NewsItemPage } from "@/components/news-item/NewsItemPage"
import ApiService from "@/shared/api/api.service"

import type { Metadata } from "next"


interface MetadataProps {
  params: Promise<{
    id: string
  }>
}
export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { id } = await params
  const { data } = await ApiService.getNewsItem({ id })
  return {
    title: data.news_item.title
  }
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  return (
    <Suspense fallback={<Loader fullScreen />} >
      <NewsItemPage id={id} />
    </Suspense>
  )
}

export default Page