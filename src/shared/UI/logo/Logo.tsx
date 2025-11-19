import Link from "next/link"
import Image from "next/image"
import { Pages } from "@/shared/config/pages.config"
import { cn } from "@/shared/utils"

import c from './logo.module.scss'

interface Props {
  className?: string
}
const Logo = ({ className }: Props) => {
  return (
    <Link href={Pages.main} className={cn(c.logo, className)} >
      <Image
        src='/logo.svg'
        alt="Logo"
        width={130}
        height={29}
        priority
      />
    </Link>
  )
}

export { Logo }