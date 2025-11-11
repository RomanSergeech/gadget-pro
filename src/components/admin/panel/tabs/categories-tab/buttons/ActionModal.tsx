'use client'

import { useEffect, useRef, useState } from 'react'
import { Modal } from '@/shared/UI/modal/Modal'
import { Button, ChooseFile, Input, Select, Toggle } from '@/shared/UI'
import { useAdminStore } from '@/shared/store/admin.store'

import type { TCategory } from '@/shared/types/category.types'

import c from '../categoriesTab.module.scss'


const CATEGORIES_INITIAL: any[] = []


export const enum EFormFileds {
  key='key',
  value='value',
  children_keys='children_keys',
  show_on_main='show_on_main'
}

type TDataObj<T, K extends keyof T> = {
  [key in K]: { value: T[key], onChange: ( v: T[key] ) => void }
}

type Item = Omit<TCategory, 'id'|'parent_key'|'children'|'items_count'|'preview'>

type TData = Partial<TDataObj<Item, keyof Item>> & {
  preview: {
    loadedUrl: string | null
    setLoadedImg: (img: { loadedUrl: string, loadedFile: Blob } | null) => void
  },
  exclude_cat_keys?: string[]
}

interface ModalProps {
  title: string
  data: TData
  active: boolean | null
  setActive: React.Dispatch<React.SetStateAction<boolean | null>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}
const ActionModal = ({ title, data, active, setActive, onSubmit }: ModalProps) => {

  const categories = useAdminStore(state => state.categories)

  const [activeSelect, setActiveSelect] = useState('')
  const [categoriesList, setCategoriesList] = useState<TCategory[]>([])

  const childrenRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if ( data.exclude_cat_keys ) {
      setCategoriesList(Object.values(categories.obj).filter(cat => !data.exclude_cat_keys?.includes(cat.key)))
    } else {
      setCategoriesList(Object.values(categories.obj))
    }
  }, [categories])

  const activateSelect = ( key: `${EFormFileds}` ) => {
    setActiveSelect(p => p === key ? '' : key)
  }

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

        <Select
          data={categoriesList}
          initialValue={data.children_keys?.value || CATEGORIES_INITIAL}
          name={EFormFileds.children_keys}
          label='Подкатегории'
          setData={v => data?.children_keys?.onChange(v)}
          active={activeSelect === EFormFileds.children_keys}
          setActive={() => activateSelect(EFormFileds.children_keys)}
          multiple
        />

        <Input
          label='Ключ'
          placeholder='ключ'
          name={EFormFileds.key}
          value={data?.key?.value}
          onChange={e => data?.key?.onChange(e.target.value)}
        />

        <Input
          label='Название'
          placeholder='Название'
          name={EFormFileds.value}
          value={data?.value?.value}
          onChange={e => data?.value?.onChange(e.target.value)}
        />

        <div className={c.toggle_wrapper} >
          <label>Отображать на главной странице</label>
          <Toggle
            name={EFormFileds.show_on_main}
            value={data.show_on_main?.value}
            onToggle={data.show_on_main?.onChange}
          />
        </div>

        <Button type='submit' >Save</Button>

      </form>
    </Modal>
  )
}


export { ActionModal }