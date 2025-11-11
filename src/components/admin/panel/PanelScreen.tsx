'use client'

import { useEffect, useState } from 'react'
import { CategoriesTab, ItemsTab } from './tabs'
import { useAdminStore } from '@/shared/store/admin.store'

import c from '../adminPage.module.scss'


const enum ETabs {
  items='items',
  categories='categories',
  news='news',
}

const TABS = [
  { key: ETabs.items, value: 'Товары' },
  { key: ETabs.categories, value: 'Категории' },
  { key: ETabs.news, value: 'Новости' },
]

const TABS_COMPONENTS: Record<`${ETabs}`, React.ReactElement> = {
  [ETabs.items]: <ItemsTab />,
  [ETabs.categories]: <CategoriesTab />,
  [ETabs.news]: <ItemsTab />,
}


interface Props {
  
}
const PanelScreen = ({  }: Props) => {

  const [tab, setTab] = useState<`${ETabs}`>(ETabs.items)

  useEffect(() => {
    useAdminStore.getState().queryAdminData()
  }, [])

  return (
    <div className={c.panel_screen} >

      <aside className={c.tabs} >
        {TABS.map(el => (
          <button
            key={el.key}
            onClick={() => setTab(el.key)}
            data-active={el.key === tab}
          >
            {el.value}
          </button>
        ))}
      </aside>

      {TABS_COMPONENTS[tab]}

    </div>
  )
}

export { PanelScreen }