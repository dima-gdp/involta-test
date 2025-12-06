import type { RssItem } from '../rss/types/rss-2.0'
import { nanoid } from 'nanoid'
import { getImageFromEnclosure } from '~/domain/rss/parse-image-url'
import type { RssCustomItem } from '~/domain/rss/types/rss-custom'

export const newsFeedSourceMap = {
  mos: 'mos.ru',
  ivanovo: 'ivanovo.bezformata.com',
} as const

export type NewsFeedSourceKey = keyof typeof newsFeedSourceMap
export type NewsFeedSourceValue = typeof newsFeedSourceMap[NewsFeedSourceKey]

export function formatNewsFeedItem(item: RssItem, source: NewsFeedSourceKey): RssCustomItem {
  return {
    ...item,
    id: nanoid(),
    sourceFormatted: newsFeedSourceMap[source],
    imageSrc: getImageFromEnclosure(item.enclosure),
    pubDateFormatted: item.pubDate ? formatDate(item.pubDate) : undefined,
  }
}

export function searchNewsFeedItems<T extends { title?: string, description?: string }>(
  items: T[],
  searchText?: string,
): T[] {
  if (!searchText) return items

  const searchLower = searchText.toLowerCase().trim()

  return items.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(searchLower)
    const descriptionMatch = item.description?.toLowerCase().includes(searchLower)
    return titleMatch || descriptionMatch
  })
}
