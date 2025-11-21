import Link from 'next/link'
import { Table } from '@/widgets'
import { AddButton } from './buttons/AddButton'
import { useAdminStore } from '@/shared/store/admin.store'
import { EditButton } from './buttons/EditButton'
import { DeleteButton } from './buttons/DeleteButton'
import { Pages } from '@/shared/config/pages.config'

import c from './newsTab.module.scss'
import cl from '../../../adminPage.module.scss'


const NewsTab = () => {

  const list = useAdminStore(state => state.news)

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
            { value: 'Заголовок' },
            // { value: 'Описание' },
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
            <li className={c.link} ><Link href={Pages.news(item.id)} >{item.title}</Link></li>
            {/* <li>{item.description}</li> */}
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

export { NewsTab }