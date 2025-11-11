import { useEffect, useState } from "react"

export const useSearchHandler = <T extends any[]>( values: T ) => {

  const [filteredValues, setFilteredValues] = useState<T>(values)

  useEffect(() => {
    setFilteredValues(values)
  }, [values])

  const searchHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const filtered = values.filter(obj => obj.value.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) as T
    setFilteredValues(filtered)
  }

  return [
    filteredValues,
    searchHandler
  ] as const

}