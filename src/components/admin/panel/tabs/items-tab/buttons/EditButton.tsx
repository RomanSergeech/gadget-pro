import { Button } from "@/shared/UI"
import { useEffect, useState } from "react"
import { ActionModal } from "./ActionModal"
import { useAdminStore } from "@/shared/store/admin.store"

import type { TItem } from "@/shared/types/item.type"

import c from '../itemsTab.module.scss'


interface Props {
  data: TItem
}
const EditButton = ({ data }: Props) => {

  const [active, setActive] = useState<boolean | null>(null)
  const [preview, setPreview] = useState<{loadedUrl:string,loadedFile:Blob|null}|null>(null)
  const [gallery, setGallery] = useState<{loadedUrl:string,loadedFile:Blob|null}[]>([])
  const [item, setItem] = useState(data) 
  const [meta, setMeta] = useState<TItem['meta']>({ title: '', description: '' })

  useEffect(() => {
    setItem(structuredClone(data))
    setPreview({
      loadedUrl: data.preview,
      loadedFile: null
    })
    setGallery(data.gallery.map(el => ({ loadedUrl: el, loadedFile: null })))
    setMeta(data.meta || { title: '', description: '' })
  }, [data])

  const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    if ( preview?.loadedFile && preview.loadedFile.size > 10 * 1024 * 1024 ) {
      alert('The file must not exceed 10 MB')
      return 
    }

    const preview_name = data.preview?.split('/').pop() || ''

    formData.set('preview_name', preview_name)

    if ( preview?.loadedFile ) {
      formData.append('preview', preview.loadedFile, 'preview')
    }
    if ( data.preview && preview?.loadedUrl === undefined ) {
      formData.set('preview_name', 'null')
    }
    if ( data.preview && preview?.loadedFile ) {
      formData.set('preview_name', 'null')
    }

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

    formData.set('specs', JSON.stringify(item.specs))

    console.log(meta);

    formData.set('meta', JSON.stringify(meta))

    formData.set('id', data.id)
    formData.set('item_id', data.item_id)

    useAdminStore.getState().editItem(formData)
      .finally(() => {
        setActive(false)
      })
  }

  const changeHandler = <K extends keyof TItem>( value: TItem[K], key: K ) => {
    setItem(obj => {
      obj[key] = value
      return structuredClone(obj)
    })
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

  return (<>
    <Button onClick={() => setActive(true)} className={c.edit_button} >
      Редактировать
    </Button>

    <ActionModal
      title='Редактировать товар'
      active={active}
      setActive={setActive}
      onSubmit={onSubmit}
      data={{
        preview: {
          loadedUrl: preview?.loadedUrl || null,
          setLoadedImg: (loadedImg) => setPreview(loadedImg),
        },
        gallery: {
          loadedImages: gallery,
          setLoadedImg: (loadedImg, url) => galleryImageHandler(loadedImg, url),
        },
        name: { value: item.name, onChange: v => changeHandler(v, 'name') },
        price: { value: item.price, onChange: v => changeHandler(v, 'price') },
        company_name: { value: item.company_name, onChange: v => changeHandler(v, 'company_name') },
        available: { value: item.available, onChange: v => changeHandler(v, 'available') },
        categories: { value: item.categories, onChange: v => changeHandler(v, 'categories') },
        tags: { value: item.tags, onChange: v => changeHandler(v, 'tags') },
        description: { value: item.description, onChange: v => changeHandler(v, 'description') },
        specs: { value: item.specs, onChange: v => changeHandler(v, 'specs') },
        meta: { value: meta, onChange: (k, v) => setMeta(p => ({ ...p, [k]: v }))}
      }}
    />
  </>)
}

export { EditButton }