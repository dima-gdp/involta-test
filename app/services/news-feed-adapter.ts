import { getApiMosRss, getApiIvanovoRss } from '~/api/news'
import { formatNewsFeedItem } from '~/domain/news-feed/news-feed-item'
import { parseRssXmlItems } from '~/utils/rss-items-parser'
import type { RssCustomItem } from '~/domain/rss/types/rss-custom'

export async function getMosNewsFeed(): Promise<RssCustomItem[]> {
  const xml = await getApiMosRss()
  const parsedItems = parseRssXmlItems(xml)

  return parsedItems.map(item => formatNewsFeedItem(item, 'mos'))
}

export async function getIvanovoNewsFeed(): Promise<RssCustomItem[]> {
  const xml = await getApiIvanovoRss()
  const parsedItems = parseRssXmlItems(xml)

  return parsedItems.map(item => formatNewsFeedItem(item, 'ivanovo'))
}
