'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/shared/utils'

import c from './modal.module.scss'


interface ModalProps {
  children: React.ReactElement
  childrenRef?: React.RefObject<HTMLElement | null>
  title: string
  isOpened: boolean | null
  onClose: () => void
  clickOutside?: true
  className?: string
}
const Modal = ({ children, childrenRef, title, isOpened, onClose, clickOutside, className }: ModalProps) => {

  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpened) {
      modalRef.current?.showModal()
      const body = document.querySelector('body')
      if ( body ) {
        body.style.overflow = 'hidden'
      }
    } else if ( isOpened === false ) {
      modalRef.current?.close()
      closeModal()
    }

    if ( childrenRef?.current && modalRef.current ) {
      const el = childrenRef.current
      if (el.scrollHeight > el.clientHeight) {
        el.dataset.scroll = 'true'
        modalRef.current.dataset.scroll = 'true'
      } else {
        el.dataset.scroll = 'false'
        modalRef.current.dataset.scroll = 'false'
      }
    }

  }, [isOpened])

  const closeModal = () => {
    onClose()
    setTimeout(() => {
      const body = document.querySelector('body')
      if ( body ) {
        //@ts-ignore
        body.style.overflow = null
      }
    }, 200)
  }

  const outsideClickHandler = ( e: React.MouseEvent<HTMLDialogElement, MouseEvent> ) => {
    if ( clickOutside ) {
      modalRef.current && !isClickInsideRectangle(e, modalRef.current) && onClose()
    }
  }

  return (
    <dialog
      ref={modalRef}
      onCancel={onClose}
      onClick={outsideClickHandler}
      className={cn(c.dialog, className)}
    >
      <button type='button' className={c.close} onClick={closeModal} ></button>
      <p>{title}</p>
      {children}
    </dialog>
  )

}

const isClickInsideRectangle = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>, element: HTMLElement) => {
  const r = element.getBoundingClientRect()
  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  )
}

export { Modal }