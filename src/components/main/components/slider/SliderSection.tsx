'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { arrayFromTo, cn } from '@/shared/utils'
import { useMainStore } from '@/shared/store/mian.store'

import c from './slider.module.scss'


const SliderSection = () => {

  const slides = useMainStore(state => state.slides)

  const [slide, setSlide] = useState(1)

  const intervalRef = useRef<any>(null)

  useEffect(() => {
    startInterval()
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [slides])

  const chooseSlide = ( id: number ) => {
    setSlide(id)
    clearInterval(intervalRef.current)
    startInterval()
  }

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setSlide(prev => {
        const next = prev + 1
        if ( next > slides.length ) {
          return 1
        }
        return next
      })
    }, 4_000)
  }

  return (
    <section
      className={cn(c.slider, 'full-width')}
    >
      <div className={cn(c.slider_body, 'full-width')} >

        {slides.map((el, i) => (
          <div
            key={i}
            className={cn(c.slide, 'full-width')}
            data-active={slide === i+1}
          >
            <div>
              <div className={c.text} >
                <p>
                  {el.text.split('\n').map((line, index) => (
                    <span key={index}>{line}<br /></span>
                  ))}
                </p>
                <Link href={el.url} >
                  {el.btn_text}
                </Link>
              </div>

              <div className={c.image_wrapper} >
                <Image
                  src={el.image}
                  alt=''
                  width={550}
                  height={550}
                  priority
                />
              </div>
            </div>
          </div>
        ))}

        <div className={c.pagination} >
          {arrayFromTo(1, slides.length).map(num => (
            <button
              key={num}
              type='button'
              onClick={() => chooseSlide(num)}
              data-active={num === slide}
            >
              <span></span>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}

export { SliderSection }