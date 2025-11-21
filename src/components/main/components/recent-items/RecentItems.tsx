'use client'

import { useMainStore } from "@/shared/store/mian.store"
import { Items } from "@/widgets"

const RecentItems = () => {

  const recentItems = useMainStore(state => state.recent)

  return (
    recentItems.length >= 5 &&
      <Items items={recentItems} />
  )
}

export { RecentItems }