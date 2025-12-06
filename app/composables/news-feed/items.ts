import { useNewsFeedStore } from '~/stores/news-feed'
import { sortByPubDate } from '~/domain/rss/sort'
import type { NewsFeedFilter } from '~/composables/news-feed/filter'

export function useNewsFeedItems(filter?: MaybeRefOrGetter<NewsFeedFilter>) {
  const filterGetter = filter

  const store = useNewsFeedStore()
  const { mosFeedItems, ivanovoFeedItems } = storeToRefs(store)

  // Все items, отсортированные по дате
  const allItems = computed(() => {
    if (mosFeedItems.value && ivanovoFeedItems.value) {
      return sortByPubDate([...mosFeedItems.value, ...ivanovoFeedItems.value])
    }
    return []
  })

  const itemsBySource = computed(() => {
    const filterValue = toValue(filterGetter)
    const sourceValue = filterValue?.source

    if (!sourceValue) return allItems.value

    if (sourceValue === 'mos') return mosFeedItems.value
    if (sourceValue === 'ivanovo') return ivanovoFeedItems.value

    return allItems.value
  })

  const filteredItems = computed(() => {
    const filterValue = toValue(filterGetter)
    const searchValue = filterValue?.search

    if (!searchValue) return itemsBySource.value

    const searchLower = searchValue.toLowerCase().trim()
    return itemsBySource.value.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(searchLower)
      const descriptionMatch = item.description?.toLowerCase().includes(searchLower)
      return titleMatch || descriptionMatch
    })
  })

  return {
    items: filteredItems,
  }
}
