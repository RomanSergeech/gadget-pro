'use client'

import { arrayFromTo, cn } from '@/shared/utils'

import c from './pagination.module.scss'

interface Props {
  page: number
  pages: number
  choosePage: ( newPage: number ) => void
  className?: string
}
const Pagination = ({ page, pages, choosePage, className }: Props) => {
  if ( pages <= 1 ) return
  return (
    <div className={cn(c.pagination, className)} >
      <div
        className={cn(c.arrow, c.left)}
        onClick={() => choosePage(page-1||1)}
        data-disabled={page === 1}
      ></div>

      {arrayFromTo(1, pages).map(num => {
        if ( pages > 5 && num != 1 && num != pages && !(num === page-1 || num === page || num === page+1)) {
          if ( num === page-2 || num === page+2 ) {
            return <div key={num} className={c.number}>...</div>
          }
          return
        }
        return (
          <div
            key={num}
            className={cn(c.number, page === +num ? c._active : '')}
            onClick={() => choosePage(+num)}
          >
            {num}
          </div>
        )
      })}

      <div
        className={cn(c.arrow, c.right)}
        onClick={() => choosePage(page+1 > pages ? pages : page+1)}
        data-disabled={page === pages}
      ></div>
    </div>
  )
}

export { Pagination }