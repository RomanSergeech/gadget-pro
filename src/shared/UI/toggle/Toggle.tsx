'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/shared/utils'

import c from './toggle.module.scss'

interface ToggleProps {
  value?: boolean
  name?: string
  className?: string
  label?: string
  disabled?: boolean
  onToggle?: ( value: boolean ) => void
}
const Toggle = ({ value, name, className, label, disabled, onToggle }: ToggleProps) => {

  const [active, setActive] = useState(false)

  useEffect(() => {
    if ( value !== undefined ) {
      setActive(value)
    }
  }, [value])

  const toggleHandler = () => {
    setActive(prev => {
      return !prev
    })
    onToggle?.(!active)
  }

  const toggle = (
    <div
      className={cn(c.toggle, className)}
      data-active={active}
      data-disabled={disabled}
      onClick={toggleHandler}
    >
      <input type="text" name={name} value={''+active} onChange={()=>{}} />
      <span>{active ? 'On' : 'Off'}</span>
    </div>
  )

  if ( label ) {
    return (
      <div className={c.toggle_wrapper} >
        <label>{label}</label>
        <div>
          {toggle}
        </div>
      </div>
    )
  }

  return toggle
}

export { Toggle }