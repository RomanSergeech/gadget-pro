
import c from './loader.module.scss'

interface Props {
  width?: number
  fontSize?: number
  fullScreen?: true
}
const Loader = ({ width=200, fontSize=16, fullScreen }: Props) => {

  const Elem = (
    <div className={c.loader} style={{ fontSize }} >
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