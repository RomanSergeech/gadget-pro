import { Button } from "@/shared/UI"
import { useEffect, useState } from "react"
import { ActionModal } from "./ActionModal"
import { useAdminStore } from "@/shared/store/admin.store"

import type { TNewsItem } from "@/shared/types/news.types"

import c from '../newsTab.module.scss'


interface Props {
  data: TNewsItem<'admin'>
}
const EditButton = ({ data }: Props) => {

  const [active, setActive] = useState<boolean | null>(null)
  const [preview, setPreview] = useState<{loadedUrl:string,loadedFile:Blob|null}|null>(null)
  const [item, setItem] = useState(data)

  useEffect(() => {
    setItem(structuredClone(data))
    if ( data.preview ) {
      setPreview({
        loadedUrl: data.preview,
        loadedFile: null
      })
    }
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

    formData.append('id', data.id)

    useAdminStore.getState().editNewsItem(formData)
      .finally(() => {
        setActive(false)
      })
  }

  const changeHandler = <K extends keyof TNewsItem<'admin'>>( value: TNewsItem<'admin'>[K], key: K ) => {
    setItem(obj => {
      obj[key] = value
      return structuredClone(obj)
    })
  }

  return (<>
    <Button onClick={() => setActive(true)} className={c.edit_button} >
      Редактировать
    </Button>

    <ActionModal
      title='Редактировать новость'
      active={active}
      setActive={setActive}
      onSubmit={onSubmit}
      data={{
        preview: {
          loadedUrl: preview?.loadedUrl || null,
          setLoadedImg: (loadedImg) => setPreview(loadedImg),
        },
        title: { value: item.title, onChange: v => changeHandler(v, 'title') },
        show_on_main: { value: item.show_on_main, onChange: v => changeHandler(v, 'show_on_main') },
        html: { value: item.html, onChange: v => changeHandler(v, 'html') },
      }}
    />
  </>)
}

export { EditButton }