'use client'

import { cn } from '@/shared/utils'
import { useMainStore } from '@/shared/store/mian.store'
import { Items } from '@/widgets'
import { SliderSection } from './components/slider/SliderSection'
import { Categories } from './components/categories/Categories'
import { News } from './components/news/News'
import { Loader } from '@/shared/UI'

import c from './main.module.scss'


const MainPage = () => {

  const loading = useMainStore(state => state.loading)
  const newItems = useMainStore(state => state.new)
  const popularItems = useMainStore(state => state.popular)
  const recentItems = useMainStore(state => state.recent)

  return (
    <main className={cn(c.page_body, 'full-width')} >

      {loading && <Loader fontSize={16} fullScreen />}

      <SliderSection />

      <Items items={newItems} />

      <Items items={popularItems} />

      {recentItems.length >= 5 &&
        <Items items={recentItems} />
      }

      <Categories />

      <News />

    </main>
  )
}

export { MainPage }