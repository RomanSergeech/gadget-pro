'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ItemCard } from '@/shared/UI'
import { cn } from '@/shared/utils'

import type { SwiperRef } from 'swiper/react'
import type { TItem } from '@/shared/types/item.type'

import c from './items.module.scss'
import 'swiper/css';


const SLIDES_PER_VIEW = 5


interface ItemsProps {
  items: TItem[]
  className?: string
}
const Items = ({ items, className }: ItemsProps) => {

  const swiperRef = useRef<SwiperRef>(null)

  return (
    <section className={cn(c.items_wrapper, className)} >

      <Swiper
        ref={swiperRef}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          1440: {
            slidesPerView: SLIDES_PER_VIEW,
            spaceBetween: 40
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }}
        loop
        className={c.items_wrapper}
      >
        {items.map(el => (
          <SwiperSlide key={el.id} className={c.slide} >
            <ItemCard item={el} showLabel />
          </SwiperSlide>
        ))}
      </Swiper>

      {items.length > SLIDES_PER_VIEW &&
        <div className={c.navigation} >
          <button onClick={() => swiperRef.current?.swiper.slideNext()} ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2929 6.29297L7.58594 12L13.2929 17.707L14.7069 16.293L10.4139 12L14.7069 7.70697L13.2929 6.29297Z" fill="#0D0D0D"/></svg></button>
          <button onClick={() => swiperRef.current?.swiper.slidePrev()} ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707L16.414 12L10.707 6.29297L9.29297 7.70697L13.586 12L9.29297 16.293L10.707 17.707Z" fill="#0D0D0D"/></svg></button>
        </div>
      }

    </section>
  )
}

export { Items }