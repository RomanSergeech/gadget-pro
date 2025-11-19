'use client'

import { useState } from 'react'
import { Swiper as SwiperElem, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { FreeMode, Thumbs } from 'swiper/modules'

import type Swiper from 'swiper'
import type { TItem } from '@/shared/types/item.type'

import c from '../itemCard.module.scss'


interface Props {
  item: TItem | null
}
const Gallery = ({ item }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper|null>(null)

  return (
    <div className={c.gallery} >

      <SwiperElem
        spaceBetween={20}
        thumbs={{ swiper: thumbsSwiper }}
        loop
        modules={[FreeMode, Thumbs]}
        className={c.main_image_wrapper}
      >
        {item?.gallery.map((el, i) => (
          <SwiperSlide key={i} className={c.slide} >
            <Image
              src={el}
              alt={item.name}
              width={400}
              height={400}
              priority
            />
          </SwiperSlide>
        ))}
      </SwiperElem>
      
      {(item?.gallery.length || 0) > 1 &&
        <SwiperElem
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          loop
          direction={'vertical'}
          className={c.images_wrapper}
          breakpoints={{
            1000: {
              slidesPerView: 4
            }
          }}
        >
          {item?.gallery.map((el, i) => (
            <SwiperSlide key={i} className={c.slide} >
              <Image
                src={el}
                alt={item.name}
                width={85}
                height={85}
                priority
              />
            </SwiperSlide>
          ))}
        </SwiperElem>
      }

    </div>
  )
}

export { Gallery }