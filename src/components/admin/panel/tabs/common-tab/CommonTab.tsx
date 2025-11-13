import { Button, Textarea } from '@/shared/UI'
import { getFormData } from '@/shared/utils'
import { useAdminStore } from '@/shared/store/admin.store'

import c from './common.module.scss'
import cl from '../../../adminPage.module.scss'


const enum EFormFields {
  payinfo='payinfo',
  about='about',
  phones='phones',
  address='address',
}


const CommonTab = () => {

  const common = useAdminStore(state => state.common)

  const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    const formData = getFormData<Record<`${EFormFields}`, string>>(e.currentTarget)

    useAdminStore.getState().editCommonData(formData)
  }

  return (
    <div className={cl.list} >
      <div className={cl.tab_header} >
        <p>Общие</p>
      </div>

      <form onSubmit={onSubmit} className={c.form} >

        <Textarea
          name={EFormFields.payinfo}
          label='Правила доставки и оплаты'
          defaultValue={common.payinfo}
        />

        <Textarea
          name={EFormFields.about}
          label='О компании'
          defaultValue={common.about}
        />

        <Textarea
          name={EFormFields.address}
          label='Адресс'
          defaultValue={common.address}
          className={c.address_field}
        />

        <Textarea
          name={EFormFields.phones}
          label='Телефоны'
          defaultValue={common.phones}
          className={c.address_field}
        />

        <Button type='submit' >Сохранить</Button>

      </form>
      
    </div>
  )
}

export { CommonTab }