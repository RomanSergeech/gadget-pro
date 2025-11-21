import { useAdminStore } from '@/shared/store/admin.store'
import { DeleteButton } from './buttons/DeleteButton'

import c from './ordersTab.module.scss'
import cl from '../../../adminPage.module.scss'


const OrdersTab = () => {

  const list = useAdminStore(state => state.orders)

  return (
    <div className={cl.list} >
      <div className={cl.tab_header} >
        <p>Заказы</p>
      </div>

      <div className={c.orders_wrapper} >
        {list.map(order => (
          <div key={order.id} >
            <p><b>Id: </b>{order.id}</p>
            <div dangerouslySetInnerHTML={{ __html: order.message.replace(/\n/g, '<br/>') }} ></div>
            <DeleteButton id={order.id} />
          </div>
        ))}
      </div>

    </div>
  )
}

export { OrdersTab }