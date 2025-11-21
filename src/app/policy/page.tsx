import dynamic from "next/dynamic"

import type { Metadata } from "next"

const PolicyPageLazy = dynamic(() => import('@/components/policy/PolicyPage'))

export const metadata: Metadata = {
  robots: "none"
}

const Page = () => {
  return <PolicyPageLazy />
}

export default Page