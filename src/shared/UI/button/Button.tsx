'use client'

import { forwardRef } from "react"
import { cn } from "@/shared/utils"

import c from './button.module.scss'

type TButtonProps = React.ButtonHTMLAttributes<HTMLElement>

type ButtonProps = {
   children: React.ReactNode
} & TButtonProps

const Button = forwardRef(({ children, className, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  return (
    <button className={cn(c.button, className)} {...props} ref={ref} >
      {children}
    </button>
  )
})

export { Button }