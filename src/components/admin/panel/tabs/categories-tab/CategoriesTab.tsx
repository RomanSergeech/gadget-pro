import { useAdminStore } from '@/shared/store/admin.store'
import { AddButton } from './buttons/AddButton'
import { Table } from '@/widgets'
import { EditButton } from './buttons/EditButton'
import { DeleteButton } from './buttons/DeleteButton'
import { Categories } from '../../components'

import c from './categoriesTab.module.scss'
import cl from '../../../adminPage.module.scss'
import { cn } from '@/shared/utils'
import { Toggle } from '@/shared/UI'


interface Props {
 
}
const CategoriesTab = ({  }: Props) => {
 
  const list = useAdminStore(state => state.categories)

  console.log(Object.values(list.obj));

  return (
    <div className={cn(cl.list, c.list)} >
      <div className={cl.tab_header} >
        <p>Категории</p>
        <AddButton />
      </div>

      <Categories />

      <Table
        titles={{
          titles: [
            { value: 'Название' },
            { value: 'Подкатегории' },
            { value: 'На главной' },
            { value: 'Действия' },
          ]
        }}
        columns={() => Object.values(list.obj)?.map((category) => (
          <ul key={category.id} >
            <li>{category.value}</li>
            <li>{category.children.map(cat => cat.key).join(', ')}</li>
            <li><Toggle value={category.show_on_main} disabled /></li>
            <li className={c.btns} >
              <EditButton data={category} />
              <DeleteButton cat_key={category.key} />
            </li>
          </ul>
        ))}
        loading={false}
        emptyData={list.arr.length === 0}
        tableClassName={c.table}
      />
    </div>
  )
}

export { CategoriesTab }