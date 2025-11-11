import { create } from "zustand"

import type { ReactElement } from "react"

export interface TAlert {
  text: string[]
	btnText?: string,
  svg?: ReactElement | null
	fixed?: boolean
}

interface TState {
  svg: ReactElement | null
	text: string[]
	btnText: string
	active: boolean | null
  timer: NodeJS.Timeout | null
	fixed: boolean
  blockSite: boolean
  onClickAction: () => void
}

interface TStore extends TState {
	activateAlert: ({ text, btnText, fixed }: TAlert) => void
	closeAlert: () => void
}

const initialState: TState = {
  svg: null,
	text: [],
	btnText: '',
	active: null,
  timer: null,
	fixed: false,
  blockSite: false,
  onClickAction: () => {}
}

export const useAlertStore = create<TStore>(
	(set) => ({
		...initialState,

		activateAlert: ( alertData ) => {
			set({
				...alertData,
				active: true
			})
		},

		closeAlert: () => {
			set({ active: false, fixed: false })
		}

	})
)