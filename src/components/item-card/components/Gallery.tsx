'use client'

import { useState } from 'react'
import { Swiper as SwiperElem, SwiperSlide } from 'swiper/react'
import { FreeMode, Thumbs } from 'swiper/modules';


import c from '../itemCard.module.scss'
import type Swiper from 'swiper'


const IMAGES = ['/images/xiaomi.png', '/images/xiaomi2.png', '/images/xiaomi3.png', '/images/xiaomi4.png', '/images/xiaomi5.png']


interface Props {
 
}
const Gallery = ({  }: Props) => {

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
        {IMAGES.map((el, i) => (
          <SwiperSlide key={i} className={c.slide} >
            <img src={el} />
          </SwiperSlide>
        ))}
      </SwiperElem>
      
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
        {IMAGES.map((el, i) => (
          <SwiperSlide key={i} className={c.slide} >
            <img src={el} />
          </SwiperSlide>
        ))}
      </SwiperElem>

    </div>
  )
}

export { Gallery }