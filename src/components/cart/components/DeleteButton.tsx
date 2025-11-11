import { useCartStore } from '@/shared/store/cart.store'

import c from '../cartPage.module.scss'

interface Props {
  id: string
}
const DeleteButton = ({ id }: Props) => {

  const deleteItem = () => {
    useCartStore.getState().deleteFromCart(id)
  }

  return (
    <button
      className={c.delete_button}
      onClick={deleteItem}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4564 5.66668H19.9419V7.50001H18.1477V19.4167C18.1477 19.6733 18.061 19.8903 17.8875 20.0675C17.7141 20.2447 17.5018 20.3333 17.2506 20.3333H4.69128C4.44009 20.3333 4.22778 20.2447 4.05434 20.0675C3.88091 19.8903 3.79419 19.6733 3.79419 19.4167V7.50001H2V5.66668H6.48547V2.91668C6.48547 2.66001 6.57219 2.44307 6.74563 2.26584C6.91906 2.08862 7.13138 2.00001 7.38256 2.00001H14.5593C14.8105 2.00001 15.0228 2.08862 15.1962 2.26584C15.3697 2.44307 15.4564 2.66001 15.4564 2.91668V5.66668ZM16.3535 7.50001H5.58837V18.5H16.3535V7.50001ZM8.27966 10.25H10.0738V15.75H8.27966V10.25ZM11.868 10.25H13.6622V15.75H11.868V10.25ZM8.27966 3.83334V5.66668H13.6622V3.83334H8.27966Z" fill="#222222"/></svg>
    </button>
  )
}

export { DeleteButton }