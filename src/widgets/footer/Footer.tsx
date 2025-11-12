import { cn } from "@/shared/utils"
import { Pages } from "@/shared/config/pages.config"

import c from './footer.module.scss'
import Link from "next/link"
import { Logo } from "@/shared/UI"


export const MENU = [
  { key: 'catalog', value: 'Каталог', link: Pages.catalog() },
  { key: 'news', value: 'Новости', link: Pages.news },
  { key: 'catpayinfoalog', value: 'Доставка и оплата', link: Pages.payinfo },
  { key: 'about', value: 'О компании', link: Pages.about },
  { key: 'contact', value: 'Контакты', link: Pages.contact },
]


const Footer = () => {
  return (
    <footer className={cn(c.footer, 'full-width')} >

      <div className={cn(c.top, 'full-width')} >
        <div>

          <ul className={c.nav} >
            {MENU.map(el => (
              <li key={el.key} >
                <Link href={el.link} >{el.value}</Link>
              </li>
            ))}
          </ul>

          <div className={c.info} >
            <Logo />
            <div>
              <p>+7 (982) 664-30-89</p>
              <p>+7 (904) 544-64-45</p>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 10C0 4.47715 4.47715 0 10 0H20C25.5228 0 30 4.47715 30 10V20C30 25.5228 25.5228 30 20 30H10C4.47715 30 0 25.5228 0 20V10Z" fill="#37AEE2"/><path d="M11.6602 23.6719C11.0156 23.6719 11.0742 23.4375 10.8984 22.8516L9.02344 16.6992L23.3789 8.26172" fill="#C8DAEA"/><path d="M11.6602 23.6719C12.0703 23.6719 12.3047 23.4375 12.5977 23.2031L15.2344 20.6836L11.9531 18.6914" fill="#A9C9DD"/><path d="M11.9531 18.6914L19.8633 24.4922C20.6836 25.0195 21.3867 24.7266 21.6211 23.6719L24.8438 8.55469C25.1367 7.26562 24.3164 6.67969 23.4375 7.08984L4.62891 14.3555C3.39844 14.8242 3.39844 15.5859 4.39453 15.8789L9.25781 17.4023L20.3906 10.3125C20.918 10.0195 21.3867 10.1367 21.0352 10.5469" fill="#F6FBFE"/></svg>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_83_650)"><path d="M25.5 0H4.5C2.01472 0 0 2.01472 0 4.5V25.5C0 27.9853 2.01472 30 4.5 30H25.5C27.9853 30 30 27.9853 30 25.5V4.5C30 2.01472 27.9853 0 25.5 0Z" fill="#25D366"/><path d="M7.20702 23.0273L8.02733 19.2188C6.97299 17.5558 6.56169 15.5652 6.87059 13.6205C7.1795 11.6759 8.18738 9.91075 9.70515 8.65634C11.2229 7.40193 13.1462 6.74445 15.1143 6.80725C17.0823 6.87005 18.9598 7.64881 20.3945 8.99743C21.8292 10.3461 22.7225 12.1718 22.9068 14.1322C23.0911 16.0927 22.5538 18.0529 21.3956 19.6453C20.2373 21.2377 18.5379 22.3527 16.616 22.7812C14.6941 23.2097 12.682 22.9222 10.957 21.9727L7.20702 23.0273Z" fill="#25D366" stroke="white" strokeWidth="2"/><path d="M18.0469 15.9961C17.8711 15.8789 17.6953 15.8203 17.5196 16.0547L16.8164 16.9922C16.6407 17.1094 16.5235 17.168 16.2891 17.0508C15.4102 16.582 14.1797 16.0547 13.125 14.2969C13.0664 14.0625 13.1836 13.9453 13.3008 13.8281L13.8282 13.0078C13.9453 12.8906 13.8867 12.7734 13.8282 12.6563L13.125 10.957C12.9492 10.4883 12.7735 10.5469 12.5977 10.5469H12.1289C12.0117 10.5469 11.7774 10.6055 11.543 10.8398C10.2539 12.1289 10.7813 13.9453 11.7188 15.1172C11.8946 15.3516 13.0664 17.4609 15.586 18.5742C17.461 19.3945 17.8711 19.2773 18.3985 19.1602C19.043 19.1016 19.6875 18.5742 19.9805 18.0469C20.0391 17.8711 20.3321 17.1094 20.0977 16.9922" fill="white"/></g><defs><clipPath id="clip0_83_650"><rect width="30" height="30" rx="10" fill="white"/></clipPath></defs></svg>
            </div>
            <p className={c.address} >
              Г. Екатеринбург ул. Куйбышева 107. 
              <span>с 11.00 до 20-00, без перерывов и выходных</span>
            </p>
          </div>

        </div>
      </div>

      <div className={cn(c.bottom, 'full-width')} >
        <div>
          <Link href={Pages.policy} >Политика конфиденциальности</Link>
          <span>© Gadget Pro 2025</span>
        </div>
      </div>

    </footer>
  )
}

export { Footer }