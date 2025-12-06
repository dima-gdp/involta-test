/**
 * Сортирует элементы по полю pubDate в порядке убывания (новые первыми)
 * Элементы без pubDate помещаются в конец
 */
export function sortByPubDate<T extends { pubDate?: string }>(items: T[]): T[] {
  return items.sort((a, b) => {
    if (!a.pubDate && !b.pubDate) return 0
    if (!a.pubDate) return 1
    if (!b.pubDate) return -1

    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  })
}
