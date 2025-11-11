'use client'

import Link from 'next/link'
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
            style={{ backgroundColor: el.bgColor }}
            data-active={slide === i+1}
          >
            <div>
              <div className={c.text} >
                <p style={{ color: el.text.color }} >
                  {el.text.value.split('\n').map((line, index) => (
                    <span key={index}>{line}<br /></span>
                  ))}
                </p>
                <Link
                  href={el.link}
                  style={{
                    color: el.btn.textColor,
                    backgroundColor: el.btn.color
                  }}
                >
                  {el.btn.value}
                </Link>
              </div>

              <div className={c.image_wrapper} >
                <img src={el.img} />
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