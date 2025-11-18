'use client'

import { useRef } from 'react'
import { Modal } from '@/shared/UI/modal/Modal'
import { Button, ChooseFile, Input, Textarea, Toggle } from '@/shared/UI'

import type { TNewsItem } from '@/shared/types/news.types'

import c from '../newsTab.module.scss'


export const enum EFormFileds {
  title='title',
  description='description',
  html='html',
  show_on_main='show_on_main',
}

type TDataObj<T, K extends keyof T> = {
  [key in K]: { value: T[key], onChange: ( v: T[key] ) => void }
}

type Item = Omit<TNewsItem<'admin'>, 'id'|'preview'>

type TData = Partial<TDataObj<Item, keyof Item>> & {
  preview: {
    loadedUrl: string | null
    setLoadedImg: (img: { loadedUrl: string, loadedFile: Blob } | null) => void
  }
}

interface ModalProps {
  title: string
  data: TData
  active: boolean | null
  setActive: React.Dispatch<React.SetStateAction<boolean | null>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}
const ActionModal = ({ title, data, active, setActive, onSubmit }: ModalProps) => {

  const childrenRef = useRef<HTMLFormElement>(null)

  return (
    <Modal
      title={title}
      isOpened={active}
      onClose={() => setActive(false)}
      className={c.item_modal}
      childrenRef={childrenRef}
    >
      <form ref={childrenRef} onSubmit={onSubmit} >

        <ChooseFile
          label='Превью'
          fileType='image'
          data={data.preview}
        />

        <div className={c.toggle_wrapper} >
          <label>Отображать на главной странице</label>
          <Toggle
            name={EFormFileds.show_on_main}
            value={data.show_on_main?.value}
            onToggle={data.show_on_main?.onChange}
          />
        </div>

        <Input
          label='Заголовок'
          placeholder='Заголовок'
          name={EFormFileds.title}
          value={data?.title?.value}
          onChange={e => data?.title?.onChange(e.target.value)}
        />

        <Textarea
          label='Тело статьи'
          name={EFormFileds.html}
          value={data?.html?.value || undefined}
          onChange={e => data?.html?.onChange(e.target.value)}
        />

        <Button type='submit' >Save</Button>

      </form>
    </Modal>
  )
}

export { ActionModal }