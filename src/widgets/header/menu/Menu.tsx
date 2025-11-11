'use client'

import { useState } from 'react'
import Link from 'next/link'
import { match } from 'path-to-regexp'
import { usePathname } from 'next/navigation'
import { MENU } from '../Header'

import c from './menu.module.scss'


const Menu = () => {

  const [active, setActive] = useState(false)

  const pathname = usePathname()

  const outSideClick = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
    if ( e.target === e.currentTarget ) {
      setActive(false)
    }
  }

  return (
    <div className={c.menu} >
      
      <button onClick={() => setActive(p => !p)} >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5H25V10H5V7.5ZM5 13.75H25V16.25H5V13.75ZM5 20H25V22.5H5V20Z" fill="#222222"/></svg>
      </button>

      <div className={c.menu_container} data-active={active} onClick={outSideClick} >

        <ul>
          {MENU.map(el => (
            <li
              key={el.key}
              data-active={!!match(el.link)(pathname)}
            >
              <Link href={el.link} onClick={() => setActive(false)} >{el.value}</Link>
            </li>
          ))}
        </ul>

      </div>

    </div>
  )
}

export { Menu }