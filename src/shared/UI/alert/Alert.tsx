'use client'

import { useEffect, useState } from "react"
import { useAlertStore } from "@/shared/store/alert.store"
import { cn } from "@/shared/utils"

import c from './alert.module.scss'

const Alert = () => {

	const store = useAlertStore()

	const [elClass, setElClass] = useState('')

	useEffect(() => {
		if (store.active && store.active !== null) {
			setElClass('_show')
		} else if (store.active !== null) {
			setElClass('_hide')
		}
	}, [store])

   const buttonHandler = () => {
      store.closeAlert()
      store.onClickAction()
   }

	return (
    <div className={cn(c.alert, elClass)} >

			{store.svg}

      {store.text.map(line => (
        <p key={line} >{line}</p>
      ))}

			{store.btnText &&
				<button
          onClick={buttonHandler}
        >
          {store.btnText}
        </button>
			}

		</div>
  )
}

export { Alert }