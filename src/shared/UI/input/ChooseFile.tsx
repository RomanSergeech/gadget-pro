'use client'

import { useRef } from "react"
import { cn } from '@/shared/utils'

import type { ChangeEvent } from "react"

import c from './input.module.scss'

const IMAGE_TYPES = '.jpg,.jpeg,.png,.svg,.ico,.icon'
const VIDEO_TYPES = '.mp4,.avi,.mov,.wmv'

interface ImageProps {
  label?: string
  fileType: 'image'|'video'
  data: {
    loadedUrl: string | null
    setLoadedImg: (img: { loadedUrl: string, loadedFile: Blob } | null) => void
  }
  className?: string
}
const ChooseFile = ({ label, fileType, data, className }: ImageProps) => {

  const { loadedUrl, setLoadedImg } = data

  const inputRef = useRef<HTMLInputElement>(null)

  const loadImg = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {

		if ( !e.target.files ) return

		const file = e.target.files[0]!

		if ( !isFileSizeAllowed(file) ) return

    setLoadedImg({ loadedUrl: URL.createObjectURL(file), loadedFile: file })

    inputRef.current!.value = ''
	}

  const cancelUpload = () => {
		inputRef.current!.value = ''
		setLoadedImg(null)
	}

  return (
    <div
      className={cn(c.choose_image, loadedUrl ? c._loaded : '', className)}
      onClick={loadedUrl ? ()=>{} : () => inputRef.current?.click()}
    >
      <input
        accept={fileType === 'image' ? IMAGE_TYPES : VIDEO_TYPES} type="file"
        ref={inputRef}
        onChange={loadImg}
      />
      {loadedUrl &&
        <div className={c.image_wrapper} >
          {fileType === 'image' &&
            <img
              id='img'
              src={loadedUrl}
            />
          }
          {fileType === 'video' &&
            <video
              id='img'
              src={loadedUrl}
              loop
              autoPlay
              muted
            />
          }
          <button type="button" onClick={cancelUpload} >Удалить</button>
        </div>
      }
      {!loadedUrl &&
        <div className={c.hint} >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1V17" stroke="black" strokeLinecap="round"/><path d="M17 9L1 9" stroke="black" strokeLinecap="round"/></svg>
          {label || `Add ${fileType}`}
        </div>
      }
    </div>
  )
}

const isFileSizeAllowed = ( file: Blob ): boolean => {

	if ( file && file.size / 1024 / 1024 >= 10 ) {

		alert('File must be less then 10 MB')

		return false
	}

	return true
}

export { ChooseFile }