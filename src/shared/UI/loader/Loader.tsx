import { cn } from '@/shared/utils'

import c from './loader.module.scss'

interface Props {
  fontSize?: number
  fullScreen?: true
  className?: string
}
const Loader = ({ fontSize=16, fullScreen, className }: Props) => {

  const Elem = (
    <div className={cn(c.loader, className)} style={{ fontSize }} >
      Загрузка
    </div>
  )

  if ( fullScreen ) {
    return (
      <div className={c.loader_wrapper} >
        {Elem}
      </div>
    )
  }

  return Elem
}

export { Loader }