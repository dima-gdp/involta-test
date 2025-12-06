import { useNewsFeedFilter } from '~/composables/news-feed/filter'
import { useNewsFeedItems } from '~/composables/news-feed/items'
import { useNewsFeedPagination } from '~/composables/news-feed/pagination'
import type { RssCustomItem } from '~/domain/rss/types/rss-custom'

export function useNewsFeed() {
  const { filter, currentPage, resetFilter } = useNewsFeedFilter()

  const { items } = useNewsFeedItems(filter)

  const { paginatedItems, totalPages } = useNewsFeedPagination<RssCustomItem>(items, currentPage)

  const formattedItems = computed(() => {
    return paginatedItems.value.map(item => ({
      ...item,
      pubDate: item.pubDateFormatted,
      source: item.sourceFormatted,
    }))
  })

  return {
    filter,
    currentPage,
    resetFilter,
    items: formattedItems,
    totalPages,
  }
}
