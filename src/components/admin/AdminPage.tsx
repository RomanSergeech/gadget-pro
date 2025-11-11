'use client'

import { useEffect } from 'react'
import { useAdminStore } from '@/shared/store/admin.store'
import { AuthScreen } from './auth/AuthScreen'
import { PanelScreen } from './panel/PanelScreen'
import { Loader } from '@/shared/UI'


const AdminPage = () => {

  const isAuth = useAdminStore(state => state.isAuth)
  const loading = useAdminStore(state => state.loading)

  useEffect(() => {
    if ( !isAuth ) {
      useAdminStore.getState().checkAuth()
    } else {
      useAdminStore.getState().queryAdminData()
    }
  }, [isAuth])
  
  if ( loading ) return <Loader fullScreen />

  if ( isAuth ) return <PanelScreen />

  return <AuthScreen />
}

export { AdminPage }