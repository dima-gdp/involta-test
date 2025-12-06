import type { NewsFeedSourceValue } from '../news-feed-item'

export interface NewsFeedItem {
  id: string
  source: NewsFeedSourceValue
  title?: string
  description?: string
  link?: string
  pubDate?: string
  imageSrc?: string
}
