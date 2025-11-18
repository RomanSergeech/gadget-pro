import { Suspense, use } from "react"
import { Loader } from "@/shared/UI"
import { NewsItemPage } from "@/components/news-item/NewsItemPage"


const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  return (
    <Suspense fallback={<Loader fullScreen />} >
      <NewsItemPage id={id} />
    </Suspense>
  )
}

export default Page