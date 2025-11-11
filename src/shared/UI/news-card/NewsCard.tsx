import Link from 'next/link'
import { Button } from '../button/Button'
import { Pages } from '@/shared/config/pages.config'

import type { TNewsItem } from '@/shared/types/news.types'

import c from './newsCard.module.scss'


interface Props {
  item: TNewsItem
}
const NewsCard = ({ item }: Props) => {
  return (
    <div className={c.news_card} >
      
      <div className={c.image_wrapper} >
        <img src={item.image} />
      </div>

      <div className={c.info} >
        <p>Фишки macOS 26 Tahoe, которые стоит изучить после обновления</p>
        <Button><Link href={Pages.news} >
          Читать <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" rx="10" fill="#00720F"/><path d="M5.5001 10.5L12.7931 10.5L10.1466 13.1465L10.8536 13.8535L14.7071 10L10.8536 6.1465L10.1466 6.8535L12.7931 9.5L5.5001 9.5L5.5001 10.5Z" fill="white"/></svg>
        </Link></Button>
      </div>

    </div>
  )
}

export { NewsCard }