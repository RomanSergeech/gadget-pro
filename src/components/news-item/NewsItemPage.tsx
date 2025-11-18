'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
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

  return (
    <div className={c.page_body} >

      <div className={c.top} >
        <ul>
          <li><Link href={Pages.news()} >Новости</Link></li>
          <li>
            <b>{news_item?.title}</b>
            {!news_item?.title && <Loader fontSize={10} />}
          </li>
        </ul>
      </div>

      <img src={news_item?.preview || undefined} />

      <article ref={containerRef} ></article>

    </div>
  )
}

export { NewsItemPage }