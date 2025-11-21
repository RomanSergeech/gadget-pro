'use client'

import Link from 'next/link'
import { useMainStore } from '@/shared/store/mian.store'
import { Button, NewsCard } from '@/shared/UI'
import { Pages } from '@/shared/config/pages.config'

import c from './news.module.scss'


const News = () => {

  const news = useMainStore(state => state.news.show)

  if ( news.length < 4 ) return null

  return (
    <div className={c.news} >

      <div className={c.header} >
        <h2>Читай о наших новостях</h2>
        <Button><Link href={Pages.news()} >Все новости</Link></Button>
      </div>

      <div className={c.news_conatiner} >
        {news.map(el => (
          <NewsCard
            key={el.id}
            item={el}
          />
        ))}
      </div>

    </div>
  )
}

export { News }