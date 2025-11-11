'use client'

import { forwardRef } from 'react'
import { cn } from '@/shared/utils'

import type { ForwardedRef, InputHTMLAttributes } from 'react'

import c from './input.module.scss'

type IInputProps = {
  label?: string
  number?: true
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef(( { label, className, number, onChange, ...props }: IInputProps, ref: ForwardedRef<HTMLInputElement> ) => {

  const onChangeValue = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( number ) {
      const value = e.target.value
      if ( !onChange ) {
        e.currentTarget.value = value.replace(/\D/g, '')
      }
      if ( value.length === 0 || /^\d+$/.test(value) ) {
        onChange?.(e)
      }
    } else {
      onChange?.(e)
    }
  }

  const input = (
    <input
      ref={ref}
      className={cn(className, c.input )}
      onChange={onChangeValue}
      {...props}
    />
  )

  if ( !label ) {
    return input
  }

  return (
    <div className={c.label_wrapper} >
      <label htmlFor={props.id} >{label}</label>
      {input}
    </div>
  )
})
