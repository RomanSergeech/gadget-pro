import dynamic from 'next/dynamic'
import { Alert } from "@/shared/UI/alert/Alert"

const AdminPageLazy = dynamic(() => import('@/components/admin/AdminPage'))

const Page = () => {
  return [
    <AdminPageLazy key={1} />,
    <Alert key={2} />
  ]
}

export default Page