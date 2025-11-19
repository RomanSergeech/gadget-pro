import { Button } from "@/shared/UI"
import { useState } from "react"
import { ActionModal } from "./ActionModal"
import { useAdminStore } from "@/shared/store/admin.store"
import type { TItem } from "@/shared/types/item.type"


const AddButton = () => {
  
  const [active, setActive] = useState<boolean | null>(null)

  const [preview, setPreview] = useState<{loadedUrl:string,loadedFile:Blob}|null>(null)
  const [gallery, setGallery] = useState<{loadedUrl:string,loadedFile:Blob}[]>([])
  const [specs, setSpecs] = useState<string[]>([])
  const [meta, setMeta] = useState<TItem['meta']>({ title: '', description: '' })

  const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    if ( preview?.loadedFile && preview.loadedFile.size > 10 * 1024 * 1024 ) {
      alert('The file must not exceed 10 MB')
      return 
    }

    if ( preview?.loadedFile ) {
      formData.append('preview', preview.loadedFile, 'preview')
    }

    formData.set('specs', JSON.stringify(specs))

    formData.set('meta', JSON.stringify(meta))

    useAdminStore.getState().addItem(formData)
      .then(() => {
        setPreview(null)
        setActive(false)
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
    <Button onClick={() => setActive(true)} >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4.16675V15.8334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.16663 10H15.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Добавить новый
    </Button>

    <ActionModal
      title='Новый товар'
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
        specs: { value: specs, onChange: v => setSpecs(v) },
        meta: { value: meta, onChange: (k, v) => setMeta(p => ({ ...p, [k]: v }))}
      }}
    />
  </>)
}

export { AddButton }