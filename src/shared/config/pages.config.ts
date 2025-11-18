
export const Pages = {
  main: '/',
  catalog: ( cat_key?: string ) => {
    let url = '/catalog'
    if ( cat_key ) {
      url += `?category=${cat_key}`
    }
    return url
  },
  item: ( item_id: string|number ) => `/item/${item_id}`,
  cart: '/cart',
  news: ( id?: string|number ) => id ? `/news/${id}` : '/news',
  payinfo: '/payinfo',
  about: '/about',
  contact: '/contact',
  policy: '/policy',
}
