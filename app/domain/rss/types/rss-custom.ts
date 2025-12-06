import type { RssItem } from '~/domain/rss/types/rss-2.0'
import type { NewsFeedSourceValue } from '~/domain/news-feed/news-feed-item'

export interface RssCustomItem extends RssItem {
  // Source не прилетает из RSS, нужно добавить
  sourceFormatted: NewsFeedSourceValue
  id: string
  pubDateFormatted?: string
  imageSrc?: string
}
