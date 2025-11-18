'use client'

import { useMainStore } from '@/shared/store/mian.store'
import { NewsCard } from '@/shared/UI'

import c from './newsPage.module.scss'


const NewsPage = () => {

  const news = useMainStore(state => state.news.list)

  return (
    <div className={c.page_body} >

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

export { NewsPage }