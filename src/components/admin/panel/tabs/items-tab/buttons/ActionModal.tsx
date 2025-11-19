'use client'

import { useEffect, useRef, useState } from 'react'
import { Modal } from '@/shared/UI/modal/Modal'
import { Button, ChooseFile, Input, Select, Textarea } from '@/shared/UI'
import { ItemAvailability, ItemLabels } from '@/shared/config/items.config'
import { useAdminStore } from '@/shared/store/admin.store'

import type { TItem } from '@/shared/types/item.type'
import type { TCategory } from '@/shared/types/category.types'

import c from '../itemsTab.module.scss'


const AVAILABULITY = Object.values(ItemAvailability)
const CATEGORIES_INITIAL: any[] = []

const TAGS = Object.values(ItemLabels)
const TAGS_INITIAL: any[] = []


export const enum EFormFileds {
  name='name',
  company_name='company_name',
  available='available',
  price='price',
  categories='categories',
  tags='tags',
  description='description',
  specs='specs'
}

type TDataObj<T, K extends keyof T> = {
  [key in K]: { value: T[key], onChange: ( v: T[key] ) => void }
}

type Item = Omit<TItem, 'id'|'item_id'|'preview'|'gallery'|'meta'>

type TData = Partial<TDataObj<Item, keyof Item>> & {
  preview: {
    loadedUrl: string | null
    setLoadedImg: (img: { loadedUrl: string, loadedFile: Blob } | null) => void
  },
  gallery: {
    loadedImages: { loadedUrl: string, loadedFile: Blob|null }[]
    setLoadedImg: (img: { loadedUrl: string, loadedFile: Blob } | null, url: string) => void
  },
  meta: { value: TItem['meta'], onChange: <K extends keyof TItem['meta']>( key: K, v: TItem['meta'][K] ) => void }
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

  const childrenRef = useRef<HTMLFormElement>(null)

  const [activeSelect, setActiveSelect] = useState('')
  const [categoriesList, setCategoriesList] = useState<TCategory[]>([])

  useEffect(() => {
    setCategoriesList(Object.values(categories.obj))
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

        <Gallery gallery={data.gallery} />

        <Select
          data={categoriesList}
          initialValue={data.categories?.value || CATEGORIES_INITIAL}
          name={EFormFileds.categories}
          label='Категории'
          setData={v => data?.categories?.onChange(v)}
          active={activeSelect === EFormFileds.categories}
          setActive={() => activateSelect(EFormFileds.categories)}
          multiple
        />

        <Select
          data={TAGS}
          initialValue={data.tags?.value || TAGS_INITIAL}
          name={EFormFileds.tags}
          label='Теги'
          setData={v => data?.tags?.onChange(v)}
          active={activeSelect === EFormFileds.tags}
          setActive={() => activateSelect(EFormFileds.tags)}
          multiple
        />

        <Select
          data={AVAILABULITY}
          initialValue={data.available?.value}
          name={EFormFileds.available}
          label='Наличие'
          setData={v => data?.available?.onChange(v)}
          active={activeSelect === EFormFileds.available}
          setActive={() => activateSelect(EFormFileds.available)}
        />

        <Input
          label='Название товара'
          placeholder='Товар'
          name={EFormFileds.name}
          value={data?.name?.value}
          onChange={e => data?.name?.onChange(e.target.value)}
        />

        <Input
          label='Производитель'
          placeholder='Производитель'
          name={EFormFileds.company_name}
          value={data?.company_name?.value}
          onChange={e => data?.company_name?.onChange(e.target.value)}
        />

        <Input
          label='Цена'
          placeholder='Цена'
          name={EFormFileds.price}
          value={data?.price?.value}
          onChange={e => data?.price?.onChange(+e.target.value)}
          number
        />

        <Textarea
          label='Описание'
          placeholder='Описание'
          name={EFormFileds.description}
          value={data?.description?.value}
          onChange={e => data?.description?.onChange(e.target.value)}
        />

        <Repeater
          label='Характеристики'
          value={data.specs?.value || []}
          setData={v => data.specs?.onChange(v)}
        />

        <div className={c.meta} >
          <label>Metadata</label>
          <Input
            label='Title'
            placeholder='Title'
            value={data?.meta?.value.title}
            onChange={e => data?.meta?.onChange('title', e.target.value)}
          />
          <Input
            label='Description'
            placeholder='Description'
            value={data?.meta?.value.description}
            onChange={e => data?.meta?.onChange('description', e.target.value)}
          />
        </div>

        <Button type='submit' >Save</Button>

      </form>
    </Modal>
  )
}

interface RepeaterProps {
  name?: string
  label: string
  value: string[]
  setData: ( v: string[] ) => void
}
const Repeater = ({ name, label, value, setData }: RepeaterProps) => {

  const [values, setValues] = useState<string[]>(value || [])

  useEffect(() => {
    setValues(value || [])
  }, [value])

  const changeData = ( e: React.ChangeEvent<HTMLInputElement>, i: number ) => {
    values[i] = e.target.value
    setData([...values])
  }

  const addValue = () => {
    setData([...values, ''])
  }

  const deleteValue = ( index: number ) => {
    setData(values.filter((_, i) => i !== index))
  }

  return (
    <div className={c.text_repeater_container} >

      <input type="text" name={name} defaultValue={JSON.stringify(values)} />

      <label>{label}</label>

      {values.map((text, i) => (
        <div key={i} data-i={i} >
          <Input
            value={text}
            onChange={e => changeData(e, i)}
          />
          <Button type='button' onClick={() => deleteValue(i)} >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11V17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11V17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      ))}

      <Button type='button' onClick={addValue} >Add</Button>

    </div>
  )
}


interface GalleryProps {
  gallery: {
    loadedImages: { loadedUrl: string, loadedFile: Blob|null }[]
    setLoadedImg: (img: { loadedUrl: string, loadedFile: Blob } | null, url: string) => void
  }
}
const Gallery = ({ gallery }: GalleryProps) => {
  return (
    <div className={c.gallery} >

      <label>Галерея</label>

      <div>
        <ChooseFile
          fileType='image'
          data={{ loadedUrl: null, setLoadedImg: img => gallery.setLoadedImg(img, img?.loadedUrl||'') }}
        />

        {gallery.loadedImages?.map((image) => (
          <ChooseFile
            key={image.loadedUrl}
            fileType='image'
            data={{
              loadedUrl: image.loadedUrl,
              setLoadedImg: img => gallery.setLoadedImg(img, image?.loadedUrl||'')
            }}
          />
        ))}
      </div>

    </div>
  )
}


export { ActionModal }