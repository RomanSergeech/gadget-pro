import { useCategoriesStore } from "@/shared/store/categories.store"
import { Checkbox } from "@/shared/UI"


const Availability = () => {

  const available = useCategoriesStore(state => state.query.available)

  const chooseAvailability = () => {
    if ( available ) {
      useCategoriesStore.getState().setQueryParams({ available: undefined })
    } else {
      useCategoriesStore.getState().setQueryParams({ available: 'available' })
    }
  }

  return (
    <button onClick={chooseAvailability} >
      <Checkbox checked={available === 'available'} onChange={()=>{}} />
      Только в наличии
    </button>
  )
}

export { Availability }