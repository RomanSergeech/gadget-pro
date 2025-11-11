import { useState } from "react"
import { showAlert } from "../utils"


export const useFormActions = () => {

  const [isSending, setIsSending] = useState(false)

  const checkFieldsValues = ( fields: { id: string, value: any }[] ) => {

    const errors: string[] = []

    fields.forEach(field => {
      if ( !field.value ) {
        errors.push(field.id)
      }
    })

    if ( errors.length > 0 ) {
      return false
    }

    return true
  }

  const alert = (error: { message: string | undefined, errors: string[] } ) => {
    const text = [error.message || 'Что-то пошло не так']
    if ( error.errors.length > 0 ) {
      text.push(error.errors[0] || '')
    }
    showAlert({
      text,
      btnText: 'Закрыть'
    }, 5000)
  }

  return {
    alert,
    checkFieldsValues,
    isSending,
    setIsSending
  }

}