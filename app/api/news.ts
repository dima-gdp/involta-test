export function getApiMosRss(): Promise<string> {
  return $fetch<string>('/api/mos.ru/rss')
}

export function getApiIvanovoRss(): Promise<string> {
  return $fetch<string>('/api/ivanovo.bezformata.com/rss')
}
