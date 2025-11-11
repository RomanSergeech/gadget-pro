import { Button } from "@/shared/UI"
import { useEffect, useState } from "react"
import { ActionModal } from "./ActionModal"
import { useAdminStore } from "@/shared/store/admin.store"

import type { TCategory } from "@/shared/types/category.types"

import c from '../categoriesTab.module.scss'


interface Props {
  data: TCategory
}
const EditButton = ({ data }: Props) => {

  const [active, setActive] = useState<boolean | null>(null)
  const [category, setCategory] = useState(data)
  const [preview, setPreview] = useState<{loadedUrl:string|null,loadedFile:Blob|null}|null>(null)

  useEffect(() => {
    setCategory(data)
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

    const categoies = useAdminStore.getState().categories.obj

    formData.set('cat_order', '' + (Object.keys(categoies).length + 1))

    formData.set('id', data.id)

    useAdminStore.getState().editCategory(formData)
      .then(() => {
        setActive(false)
      })
  }

  const changeHandler = <K extends keyof TCategory>( value: TCategory[K], key: K ) => {
    setCategory(obj => {
      obj[key] = value
      return structuredClone(obj)
    })
  }

  return (<>
    <Button onClick={() => setActive(true)} className={c.edit_button} >
      Изменить
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
        key: { value: category.key, onChange: v => changeHandler(v, 'key') },
        value: { value: category.value, onChange: v => changeHandler(v, 'value') },
        children_keys: { value: category.children_keys, onChange: v => changeHandler(v, 'children_keys') },
        show_on_main: { value: category.show_on_main, onChange: v => changeHandler(v, 'show_on_main') },
        exclude_cat_keys: [...category.all_parents, category.key],
      }}
    />
  </>)
}

export { EditButton }