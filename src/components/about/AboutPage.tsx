'use client'

import { useEffect, useRef } from 'react'
import { useMainStore } from '@/shared/store/mian.store'

import c from './about.module.scss'


const AboutPage = () => {

  const about = useMainStore(state => state.common.about)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ( about && containerRef.current ) {
      containerRef.current.innerHTML = about.replace(/\n/g, '<br />')
    }
  }, [about])

  return (
    <div className={c.page_body} >

      <h1>О Компании</h1>

      <p ref={containerRef} ></p>

    </div>
  )
}

export { AboutPage }