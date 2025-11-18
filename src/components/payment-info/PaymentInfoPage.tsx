'use client'

import { useEffect, useRef } from 'react'
import { useMainStore } from '@/shared/store/mian.store'

import c from './paymentInfoPage.module.scss'


const PaymentInfoPage = () => {

  const common = useMainStore(state => state.common)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ( common.payinfo && containerRef.current ) {
      containerRef.current.innerHTML = common.payinfo.replace(/\n/g, '<br />')
    }
  }, [common])

  return (
    <div className={c.page_body} >
      
      <h1>Правила доставки и оплаты</h1>

      <p ref={containerRef} ></p>

    </div>
  )
}

export { PaymentInfoPage }