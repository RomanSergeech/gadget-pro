import { Inter } from "next/font/google"

import type { Metadata } from "next"

import "@/shared/assets/style.scss"


const inter = Inter({
  style: 'normal',
  weight: ['400','500','600','700'],
  subsets: ["latin","cyrillic"],
})

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_DOMAIN,
  title: {
    template: '%s - Gadget Pro',
    default: 'Gadget Pro - Интернет-магазин электронных товаров. Мы предлагаем широкий ассортимент продуктов Garmin. GPS-навигаторы, смарт-часы и фитнес-трекеры. У нас высокое качество, надежность и профессиональная поддержка, чтобы вы могли всегда быть на шаг впереди в своих приключениях и тренировках!'
  },
  description: 'Магазин электронных товаров',
  openGraph: {
    url: process.env.NEXT_PUBLIC_DOMAIN,
    title: 'Магазин электронных товаров - Gadget Pro',
    description: 'Интернет-магазин электронных товаров. Мы предлагаем широкий ассортимент продуктов Garmin. GPS-навигаторы, смарт-часы и фитнес-трекеры. У нас высокое качество, надежность и профессиональная поддержка, чтобы вы могли всегда быть на шаг впереди в своих приключениях и тренировках!',
    siteName: 'Gadget Pro'
  },
  robots: "all"
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
