import { ItemCardPage } from "@/components"
import { use } from "react"

const Page = ({ params }: { params: Promise<{ item_id: string }> }) => {
  const { item_id } = use(params)
  return <ItemCardPage item_id={item_id} />
}

export default Page