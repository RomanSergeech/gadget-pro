
export type TNewsItem<T extends 'admin'|'full'|'cutted' = 'full'> = T extends 'full'
  ? Omit<NewsItem, 'show_on_main'>
  : T extends 'admin'
    ? NewsItem
    : Omit<NewsItem, 'html'|'show_on_main'>

type NewsItem = {
  id: string
  title: string
  html: string | null
  preview: string | null
  show_on_main: boolean
}
