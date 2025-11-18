'use client'

import { useEffect, useState } from 'react'
import { Button, ChooseFile, Input, Textarea } from '@/shared/UI'
import { getFormData } from '@/shared/utils'
import { useAdminStore } from '@/shared/store/admin.store'

import type { TSlide } from '@/shared/types/slide.types'

import c from './common.module.scss'
import cl from '../../../adminPage.module.scss'


const enum EFormFields {
  payinfo='payinfo',
  about='about',
  phones='phones',
  address='address',
  slider='slider',
}


const CommonTab = () => {

  const common = useAdminStore(state => state.common)
  const slides = useAdminStore(state => state.slides)

  const [gallery, setGallery] = useState<{loadedUrl:string,loadedFile:Blob|null}[]>([])
  const [slider, setSlider] = useState<TSlide[]>([])

  useEffect(() => {
    if ( slides.length > 0 ) {
      slides.forEach((slide, i) => {
        setGallery(prev => {
          prev[i] = ({ loadedUrl: slide.image, loadedFile: null })
          return [...prev]
        })
      })
      setSlider(slides)
    }
  }, [slides])

  const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    const formData = getFormData<Record<`${EFormFields}`, string>>(e.currentTarget)

    useAdminStore.getState().editCommonData(formData)
  }

  const onSubmitSlider = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    if ( gallery.length > 0 ) {
      const g = gallery.filter(el => el.loadedFile !== null)
      g.forEach(el => {
        formData.append('gallery', el.loadedFile!)
      })
    }

    const gallery_names = gallery
      .map(el => el.loadedUrl?.split('/').pop()?.endsWith('.png') ? el.loadedUrl?.split('/').pop() : null)
      .filter(el => el !== null)

    formData.set('gallery_names', JSON.stringify(gallery_names))

    formData.set('slides', JSON.stringify(slider))

    // useAdminStore.getState().editCommonData(formData)
  }

  const galleryImageHandler = ( loadedImg: { loadedUrl: string, loadedFile: Blob } | null, url: string ) => {
    setGallery(prev => {
      if ( loadedImg && !gallery.find(img => img.loadedUrl === loadedImg.loadedUrl) ) {
        prev.push(loadedImg)
      }
      if ( loadedImg === null ) {
        prev = prev.filter(img => img.loadedUrl !== url)
      }
      return [...prev]
    })
  }

  return (
    <div className={cl.list} >
      <div className={cl.tab_header} >
        <p>Общие</p>
      </div>

      <form onSubmit={onSubmit} className={c.form} >

        <Textarea
          name={EFormFields.payinfo}
          label='Правила доставки и оплаты'
          defaultValue={common.payinfo}
        />

        <Textarea
          name={EFormFields.about}
          label='О компании'
          defaultValue={common.about}
        />

        <Textarea
          name={EFormFields.address}
          label='Адресс'
          defaultValue={common.address}
          className={c.address_field}
        />

        <Textarea
          name={EFormFields.phones}
          label='Телефоны'
          defaultValue={common.phones}
          className={c.address_field}
        />

        <Button type='submit' >Сохранить</Button>

      </form>

      <form onSubmit={onSubmitSlider} >
        <Slider
          gallery={{
            loadedImages: gallery,
            setLoadedImg: (loadedImg, url) => galleryImageHandler(loadedImg, url)
          }}
          slider={slider}
        />

        <Button type='submit' >Сохранить</Button>
      </form>
      
    </div>
  )
}

interface GalleryProps {
  gallery: {
    loadedImages: { loadedUrl: string, loadedFile: Blob|null }[]
    setLoadedImg: (img: { loadedUrl: string, loadedFile: Blob } | null, url: string) => void
  }
  slider: TSlide[]
}
const Slider = ({ gallery, slider }: GalleryProps) => {
  return (
    <div className={c.gallery} >

      <label>Изображения для слайдера</label>

      <div>
        <ChooseFile
          label='Добавить слайд'
          fileType='image'
          data={{ loadedUrl: null, setLoadedImg: img => gallery.setLoadedImg(img, img?.loadedUrl||'') }}
          className={c.choose_image}
        />

        {gallery.loadedImages?.map((image, i) => (
          <div>
            <ChooseFile
              key={image.loadedUrl}
              fileType='image'
              data={{
                loadedUrl: image.loadedUrl,
                setLoadedImg: img => gallery.setLoadedImg(img, image?.loadedUrl||'')
              }}
              className={c.choose_image}
            />
            <Input placeholder='Текст' defaultValue={slider[i]?.text} />
            <Input placeholder='Текст кнопки' defaultValue={slider[i]?.btn_text} />
            <Input placeholder='Ссылка' defaultValue={slider[i]?.url} />
          </div>
        ))}
      </div>

    </div>
  )
}

export { CommonTab }