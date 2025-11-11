import { useAdminStore } from '@/shared/store/admin.store'
import { getFormData } from '@/shared/utils'
import { useFormActions, useShowHidePassword } from '@/shared/hooks'
import { Button, Input, Loader, Logo } from '@/shared/UI'

import c from '../adminPage.module.scss'


const enum EFormFields {
  email='email',
  password='password'
}

type TFormData = Record<EFormFields, string>


const AuthScreen = () => {

  const { checkFieldsValues, isSending, setIsSending, alert } = useFormActions()

  const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    const data = getFormData<TFormData>(e.currentTarget)

    const isValid = checkFieldsValues([
      { id: 'email', value: data.email },
      { id: 'password', value: data.password }
    ])

    if ( !isValid ) return

    setIsSending(true)

    await useAdminStore.getState().login(data as TFormData)
      .catch(alert)
      .finally(() => setIsSending(false))
  }

  const { inputType, ShowHidePasswordSvgElement } = useShowHidePassword()

  return (
    <div className={c.auth_screen} >
      
      <form
        className={c.form}
        onSubmit={onSubmit}
      >
        <Logo className={c.logo} />

        <div className={c.loader_wrapper} >
          {isSending && <Loader fontSize={12} />}
        </div>

        <Input
          type="email"
          name={EFormFields.email}
          label='Email'
          placeholder='Email'
          required
        />

        <div className={c.password_wrapper} >
          <Input
            type={inputType}
            name={EFormFields.password}
            label='Password'
            autoComplete="off"
            className={c.password}
            placeholder='Password'
            required
          />

          <ShowHidePasswordSvgElement />
        </div>

        <Button
          type="submit"
          disabled={isSending ? true : false}
        >
          Login
        </Button>

      </form>

    </div>
  )
}

export { AuthScreen }