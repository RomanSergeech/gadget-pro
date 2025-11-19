import { NewsPage } from "@/components/news/NewsPage"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Новости',
}

const Page = () => {
  return <NewsPage />
}

export default Page