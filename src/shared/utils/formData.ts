
type TFormData<T> = {
  [Key in keyof T]: T[Key]
}

export const getFormData = <T>( elem: HTMLFormElement ): TFormData<T> => {

  const formData = new FormData(elem)

  const data = [...formData]

  return data.reduce<any>((acc, arr) => {
    acc[arr[0]] = arr[1]
    return acc
  }, {})
}

export const createFormData = <T>( data: TFormData<T> ): FormData => {
  const formData = new FormData()

  for ( const key in data ) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const el = data[key]
      if ( el instanceof Blob ) {
        formData.append(key, el, key)
      } else {
        formData.append(key, JSON.stringify(el))
      }
    }
  }

  return formData
}
