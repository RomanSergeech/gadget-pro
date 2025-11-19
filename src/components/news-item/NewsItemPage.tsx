'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useNewsItemStore } from '@/shared/store/newsItem.store'
import { Pages } from '@/shared/config/pages.config'
import { Loader } from '@/shared/UI'

import c from './newsItemPage.module.scss'


interface Props {
  id: string
}
const NewsItemPage = ({ id }: Props) => {

  const news_item = useNewsItemStore(state => state.news_item)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    useNewsItemStore.getState().queryNewsItemData(id)
  }, [id])

  useEffect(() => {
    if ( news_item?.html && containerRef.current ) {
      containerRef.current.innerHTML = news_item.html
    }
  }, [news_item])

  if ( !news_item?.title ) {
    return (
      <div className={c.page_body} >
        <div className={c.top} >
          <ul>
            <li><Link href={Pages.news()} >Новости</Link></li>
            <li><Loader fontSize={10} /></li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className={c.page_body} >

      <div className={c.top} >
        <ul>
          <li><Link href={Pages.news()} >Новости</Link></li>
          <li><b>{news_item?.title}</b></li>
        </ul>
      </div>

      <Image
        src={news_item?.preview || ''}
        alt={news_item?.title || 'Gadget Pro News'}
        width={450}
        height={400}
        priority
      />

      <article ref={containerRef} ></article>

    </div>
  )
}

export { NewsItemPage }