import type { NewsFeedViewType } from '~/domain/news-feed/types'
import { useLocalStorage } from '@vueuse/core'

export function useNewsFeedViewType() {
  const viewType = useLocalStorage<NewsFeedViewType>('news-feed-view-type', 'grid')

  return {
    viewType,
  }
}
