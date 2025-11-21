'use client'

import { useState } from 'react'
import { CategoriesTab, CommonTab, ItemsTab, NewsTab, OrdersTab } from './tabs'

import c from '../adminPage.module.scss'


const enum ETabs {
  orders='orders',
  common='common',
  items='items',
  categories='categories',
  news='news',
}

const TABS = [
  { key: ETabs.orders, value: 'Заказы' },
  { key: ETabs.common, value: 'Общие' },
  { key: ETabs.items, value: 'Товары' },
  { key: ETabs.categories, value: 'Категории' },
  { key: ETabs.news, value: 'Новости' },
]

const TABS_COMPONENTS: Record<`${ETabs}`, React.ReactElement> = {
  [ETabs.orders]: <OrdersTab />,
  [ETabs.common]: <CommonTab />,
  [ETabs.items]: <ItemsTab />,
  [ETabs.categories]: <CategoriesTab />,
  [ETabs.news]: <NewsTab />,
}


const PanelScreen = () => {

  const [tab, setTab] = useState<`${ETabs}`>(ETabs.orders)

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