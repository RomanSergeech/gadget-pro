'use client'

import { useEffect, useState } from "react"
import { cn } from "@/shared/utils"
import { useSearchHandler } from "@/shared/hooks"

import c from './select.module.scss'

type MultipleSelectProps = {
  data: {key:string,value:string}[]
  initialValue: string[] | undefined
  label: string
  name: string
  active: boolean
  multiple: true
  setActive: () => void
  setData?: ( val: string[] ) => void
  search?: boolean
  required?: true
  className?: string
}

type SelectProps = MultipleSelectProps | {
  data: {key:string,value:string}[]
  initialValue: string | undefined
  label: string
  name: string
  search?: boolean
  active: boolean
  setActive: () => void
  setData?: ( val: string ) => void
  required?: true
  className?: string
  multiple?: false
}

export const Select = ({ data, initialValue, label, name, search, active, required, className, multiple, setActive, setData }: SelectProps) => {

  const [value, setValue] = useState<{key:string,value:string} | undefined>(
    data.find(el => el.key === initialValue) || data[0]
  )

  const [values, setValues] = useState<string[]>([])

  useEffect(() => {
    if ( multiple ) {
      const v = data[0]?.key ? [data[0].key] : []
      setValues(initialValue === undefined ? v : Array.isArray(initialValue) ? initialValue : v)
    } else {
      setValue(data.find(el => el.key === initialValue) || data[0])
    }
  }, [data])

  useEffect(() => {
    if ( multiple ) {
      const v = data[0]?.key ? [data[0].key] : []
      setValues(initialValue === undefined ? v : Array.isArray(initialValue) ? initialValue : v)
    } else {
      setValue(data.find(el => el.key === initialValue) || data[0])
    }
  }, [initialValue])

  const handleChange = ( group: {key:string,value:string} ) => {
    if ( multiple ) {
      setValues(prev => {
        if ( values.includes(group.key) ) {
          // setData?.(prev.filter(el => el !== group.key))
          return prev.filter(el => el !== group.key)
        }
        prev.push(group.key)
        // setData?.(values.filter(el => el !== ''))
        return prev.filter(el => el !== '')
      })
      // if ( values.includes(group.key) ) {
      //   setData?.(values.filter(el => el !== group.key))
      // } else {
      //   setData?.(values.filter(el => el !== ''))
      // }
    } else {
      setValue(group)
      setData?.(group.key)
    }
    setActive()
  }

  const [ filtered, searchHandler ] = useSearchHandler(data)

  return (
     <div className={cn(c.select_wrapper, className)} >

        <p className={c.label} >{label}</p>

        <div className={c.select} data-active={active} >

           <div
            className={c.value}
            onClick={setActive}
            data-active={active}
          >
            <div className={c.values_wrapper} >
              {!multiple && <>
                <input type="text" value={value?.value || ''} onChange={()=>{}} />
                <input required={required} type="text" id={name} name={name} value={value?.key || ''} onChange={()=>{}} />
              </>}

              {multiple && values?.reduce((acc, el, i) => {
                const value = data.find(elem => elem.key === el)?.value
                if ( i === values?.length-1 ) {
                  acc += value
                } else {
                  acc += `${value}, `
                }
                return acc
              }, '')}

              {multiple &&
                <input type="text" id={name} name={name} value={JSON.stringify(values)} onChange={()=>{}} />
              }
            </div>
           </div>

           <div className={c.select_body} data-active={active} >

              {search &&
                <div className={c.search} >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8526 14.1475C15.4251 13.7408 15.0159 13.3166 14.7134 12.9941C14.4034 12.6791 14.2167 12.45 14.2167 12.45L11.8834 11.3358C12.7834 10.3083 13.3334 8.96913 13.3334 7.49996C13.3334 4.28413 10.7167 1.66663 7.50008 1.66663C4.28341 1.66663 1.66675 4.28413 1.66675 7.49996C1.66675 10.7158 4.28341 13.3333 7.50008 13.3333C8.96925 13.3333 10.3084 12.7833 11.3359 11.8841L12.4501 14.2175C12.4501 14.2175 12.6792 14.4041 12.9942 14.7141C13.3167 15.0166 13.7409 15.4258 14.1476 15.8533C14.5592 16.275 14.9709 16.6966 15.2792 17.0133C15.5809 17.3366 15.7826 17.5516 15.7826 17.5516L17.5501 15.7841C17.5501 15.7841 17.3351 15.5825 17.0117 15.2808C16.6959 14.9708 16.2742 14.5591 15.8526 14.1475ZM7.50008 11.6666C5.20258 11.6666 3.33341 9.79746 3.33341 7.49996C3.33341 5.20246 5.20258 3.33329 7.50008 3.33329C9.79758 3.33329 11.6667 5.20246 11.6667 7.49996C11.6667 9.79746 9.79758 11.6666 7.50008 11.6666Z" fill="#808080"/></svg>
                  <input
                    type="text"
                    placeholder='Search...'
                    onChange={searchHandler}
                  />
                </div>
              }

              <div className={c.elems_wrapper}>
                 {filtered?.map(elem => (
                    <div
                      key={elem.key}
                      data-active={multiple ? values.some(el => el === elem.key) : value?.value === elem.value}
                      onClick={() => handleChange(elem)}
                    >
                      {elem.value}
                    </div>
                 ))}
              </div>

           </div>

        </div>
     </div>
  )
}
