import { Inter } from "next/font/google"

import type { Metadata } from "next"

import "@/shared/assets/style.scss"


const inter = Inter({
  style: 'normal',
  weight: ['400','500','600','700'],
  subsets: ["latin","cyrillic"],
})

export const metadata: Metadata = {
  title: {
    template: '%s - Gadget Pro',
    default: 'Магазин - Gadget Pro'
  },
  description: "Магазин электронных товаров",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth" >
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
