import { AboutPage } from "@/components/about/AboutPage"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'О компании',
}

const Page = () => {
  return <AboutPage />
}

export default Page