import { Button } from "@/shared/UI"
import { useState } from "react"
import { ActionModal } from "./ActionModal"
import { useAdminStore } from "@/shared/store/admin.store"


const AddButton = () => {
  
  const [active, setActive] = useState<boolean | null>(null)
  const [preview, setPreview] = useState<{loadedUrl:string,loadedFile:Blob}|null>(null)

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

    useAdminStore.getState().addCategory(formData)
      .then(() => {
        setActive(false)
      })
  }

  return (<>
    <Button onClick={() => setActive(true)} >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4.16675V15.8334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.16663 10H15.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Добавить новый
    </Button>

    <ActionModal
      title='Новая категория'
      active={active}
      setActive={setActive}
      onSubmit={onSubmit}
      data={{
        preview: {
          loadedUrl: preview?.loadedUrl || null,
          setLoadedImg: (loadedImg) => setPreview(loadedImg),
        },
      }}
    />
  </>)
}

export { AddButton }