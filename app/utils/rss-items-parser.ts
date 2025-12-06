import { parseXml } from '~/utils/xml-parser'
import type { RssItem, RssFeed } from '~/domain/rss/types/rss-2.0'

export function parseRssXmlItems(xml: string): RssItem[] {
  const xmlParsedData = parseXml(xml) as RssFeed

  const item = xmlParsedData.rss.channel.item

  if (Array.isArray(item)) {
    return item
  }

  if (item) {
    return [item]
  }

  return []
}
