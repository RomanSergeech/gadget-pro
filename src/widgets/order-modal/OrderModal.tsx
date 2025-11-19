'use client'

import { useEffect, useState } from 'react'
import { Button, Input, Modal, Textarea } from '@/shared/UI'
import { getFormData, getPrice } from '@/shared/utils'
import { useMainStore } from '@/shared/store/mian.store'
import { useCartStore } from '@/shared/store/cart.store'

import type { ReactElement } from 'react'
import type { TMakeOrderRequest } from '@/shared/types/api.types'

import c from './orderModal.module.scss'


const enum EFormFields {
  name='name',
  phone='phone',
  email='email',
  message='message',
}


interface Props {
  countItems: Record<string, { id: string, count: number }>
  items_count: number
  amount: number
  button: ( onClick: () => void ) => ReactElement
}
const OrderModal = ({ countItems, items_count, amount, button }: Props) => {

  const order_id = useMainStore(state => state.order_id)

  const [active, setActive] = useState<boolean | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if ( order_id ) {
      setSuccess(true)
    }
  }, [order_id])

  const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    const formData = getFormData<Record<`${EFormFields}`, string>>(e.currentTarget)

    const items = useCartStore.getState().items.reduce<TMakeOrderRequest['items']>((acc, item) => {
      const count = countItems[item.id]?.count || 1
      const amount = item.price * count
      acc.push({ item, count, amount })
      return acc
    }, [])

    setLoading(true)

    useMainStore.getState().makeOrder({
      items,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message
    })
    .finally(() => {
      setLoading(false)
      setActive(false)
    })
  }

  return (
    <div>

      {button(() => setActive(true))}

      <Modal
        title='Оформление заказа'
        isOpened={active}
        onClose={() => setActive(false)}
        className={c.order_modal}
      >
        <form onSubmit={onSubmit} >

          <div className={c.info} >
            <p>Количество товаров: <span>{items_count}</span></p>
            <p>Итоговая сумма: <span>{getPrice(amount)}</span></p>
          </div>

          <Input
            autoComplete='name'
            label='Ваше Имя, Фамилия*'
            aria-label='Ваше Имя, Фамилия*'
            placeholder='Имя'
            name={EFormFields.name}
            required
          />

          <Input
            type='tel'
            autoComplete='tel'
            label='Ваш телефон*'
            aria-label='Ваш телефон*'
            placeholder='Tелефон'
            name={EFormFields.phone}
            required
          />

          <Input
            type='email'
            autoComplete='email'
            label='Ваш E-mail'
            aria-label='Ваш Email'
            placeholder='Email'
            name={EFormFields.email}
          />

          <Textarea
            label='Примечания к заказу'
            aria-label='Примечания к заказу'
            placeholder='Сообщение'
            name={EFormFields.message}
          />

          <Button type='submit' disabled={loading} >
            {loading
              ? 'Отправляем...'
              : 'Отправить'
            }
          </Button>

        </form>
      </Modal>

      <Modal
        title='Ваша заявка принята'
        isOpened={success}
        onClose={() => {
          setSuccess(false)
          useMainStore.setState({ order_id: null })
        }}
        className={c.success_modal}
      >
        <form>
          
          <b>
            Спасибо за заказ. <br />
            Мы свяжемся с вам как можно скорее
          </b>
          <p>Номер заказа: {order_id}</p>
        </form>
      </Modal>

    </div>
  )
}

export { OrderModal }