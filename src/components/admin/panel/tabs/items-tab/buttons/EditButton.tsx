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
  const [item, setItem] = useState(data)

  useEffect(() => {
    setItem(structuredClone(data))
    setPreview({
      loadedUrl: data.preview,
      loadedFile: null
    })
  }, [data])

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

    formData.set('specs', JSON.stringify(item.specs))

    formData.append('id', data.id)

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

  return (<>
    <Button onClick={() => setActive(true)} className={c.edit_button} >
      Редактировать
    </Button>

    <ActionModal
      title='Edit card'
      active={active}
      setActive={setActive}
      onSubmit={onSubmit}
      data={{
        preview: {
          loadedUrl: preview?.loadedUrl || null,
          setLoadedImg: (loadedImg) => setPreview(loadedImg),
        },
        name: { value: item.name, onChange: v => changeHandler(v, 'name') },
        price: { value: item.price, onChange: v => changeHandler(v, 'price') },
        company_name: { value: item.company_name, onChange: v => changeHandler(v, 'company_name') },
        available: { value: item.available, onChange: v => changeHandler(v, 'available') },
        categories: { value: item.categories, onChange: v => changeHandler(v, 'categories') },
        tags: { value: item.tags, onChange: v => changeHandler(v, 'tags') },
        description: { value: item.description, onChange: v => changeHandler(v, 'description') },
        specs: { value: item.specs, onChange: v => changeHandler(v, 'specs') },
      }}
    />
  </>)
}

export { EditButton }