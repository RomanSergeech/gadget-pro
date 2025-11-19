import dynamic from 'next/dynamic'
import { Alert } from "@/shared/UI/alert/Alert"

import type { Metadata } from 'next'

const AdminPageLazy = dynamic(() => import('@/components/admin/AdminPage'))

export const metadata: Metadata = {
  robots: "none"
}

const Page = () => {
  return [
    <AdminPageLazy key={1} />,
    <Alert key={2} />
  ]
}

export default Page