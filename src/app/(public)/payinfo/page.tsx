import { PaymentInfoPage } from "@/components/payment-info/PaymentInfoPage"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Правила доставки и оплаты',
}

const Page = () => {
  return <PaymentInfoPage />
}

export default Page