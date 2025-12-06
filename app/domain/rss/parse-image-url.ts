import type { RssEnclosure } from '~/domain/rss/types/rss-2.0'

export function getImageFromEnclosure(enclosure?: RssEnclosure | RssEnclosure[]): string | undefined {
  if (!enclosure) return undefined

  const enclosures = Array.isArray(enclosure) ? enclosure : [enclosure]

  const firstImage = enclosures.find(item => item.type?.startsWith('image/'))

  return firstImage?.url
}
