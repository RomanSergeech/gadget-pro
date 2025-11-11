'use client'

import { forwardRef } from 'react'
import { cn } from '@/shared/utils'

import type { ForwardedRef, TextareaHTMLAttributes } from 'react'

import c from './input.module.scss'

type ITextareaProps = {
   label?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef(( { label, className, ...props }: ITextareaProps, ref: ForwardedRef<HTMLTextAreaElement> ) => {
	
   const textarea = (
      <textarea
			className={cn(className, c.input )}
			{...props}
			ref={ref}
		/>
   )

   if ( !label ) {
      return textarea
   }

   return (
      <div className={c.label_wrapper} >
         <label htmlFor={props.id} >{label}</label>
         {textarea}
      </div>
   )
})
