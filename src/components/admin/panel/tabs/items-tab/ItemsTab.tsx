import Link from 'next/link'
import { Table } from '@/widgets'
import { AddButton } from './buttons/AddButton'
import { useAdminStore } from '@/shared/store/admin.store'
import { EditButton } from './buttons/EditButton'
import { DeleteButton } from './buttons/DeleteButton'
import { getPrice } from '@/shared/utils'
import { ItemAvailability } from '@/shared/config/items.config'

import c from './itemsTab.module.scss'
import cl from '../../../adminPage.module.scss'


interface Props {
  
}
const ItemsTab = ({  }: Props) => {

  const list = useAdminStore(state => state.items)

  return (
    <div className={cl.list} >
      <div className={cl.tab_header} >
        <p>Товары</p>
        <AddButton />
      </div>

      <Table
        titles={{
          titles: [
            { value: 'Превью' },
            { value: 'Название' },
            { value: 'Цена' },
            { value: 'Остаток' },
            { value: 'Действия' },
          ]
        }}
        columns={() => list?.map((item) => (
          <ul key={item.id} >
            <li className={c.image} >
              {item.preview &&
                <img src={item.preview} />
              }
            </li>
            <li><Link href={item.preview} >{item.name}</Link></li>
            <li>{getPrice(item.price)}</li>
            <li data-available={item.available} >
              {ItemAvailability[item.available as keyof typeof ItemAvailability].value}
            </li>
            <li className={c.btns} >
              <EditButton data={item} />
              <DeleteButton id={item.id} />
            </li>
          </ul>
        ))}
        loading={false}
        emptyData={list.length === 0}
        tableClassName={c.table}
      />
    </div>
  )
}

export { ItemsTab }