import Link from "next/link"
import { Pages } from "@/shared/config/pages.config"
import type { TCategory } from "@/shared/types/category.types"

import c from './categoryCard.module.scss'


interface Props {
  category: TCategory
}
const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      href={Pages.catalog(category.key)}
      className={c.category}
    >
      <div className={c.image_wrapper} >
        <img src={category.preview || undefined} />
      </div>

      <p>{category.value}</p>

    </Link>
  )
}

export { CategoryCard }