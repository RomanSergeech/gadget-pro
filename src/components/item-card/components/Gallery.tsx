'use client'

import { useState } from 'react'
import { Swiper as SwiperElem, SwiperSlide } from 'swiper/react'
import { FreeMode, Thumbs } from 'swiper/modules';
import { useItemStore } from '@/shared/store/item.store'
import type Swiper from 'swiper'

import c from '../itemCard.module.scss'


interface Props {
 
}
const Gallery = ({  }: Props) => {

  const item = useItemStore(state => state.item)

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
            <img src={el} />
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
              <img src={el} />
            </SwiperSlide>
          ))}
        </SwiperElem>
      }

    </div>
  )
}

export { Gallery }