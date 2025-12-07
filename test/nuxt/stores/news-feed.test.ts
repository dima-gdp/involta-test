import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNewsFeedStore } from '~/stores/news-feed'
import type { RssCustomItem } from '~/domain/rss/types/rss-custom'

const mockMosItems: RssCustomItem[] = [
  { id: '1', title: 'Mos News 1', sourceFormatted: 'mos.ru' },
  { id: '2', title: 'Mos News 2', sourceFormatted: 'mos.ru' },
]

const mockIvanovoItems: RssCustomItem[] = [
  { id: '3', title: 'Ivanovo News 1', sourceFormatted: 'ivanovo.bezformata.com' },
  { id: '4', title: 'Ivanovo News 2', sourceFormatted: 'ivanovo.bezformata.com' },
]

vi.mock('~/services/news-feed-adapter', () => ({
  getMosNewsFeed: vi.fn(() => Promise.resolve(mockMosItems)),
  getIvanovoNewsFeed: vi.fn(() => Promise.resolve(mockIvanovoItems)),
}))

describe('useNewsFeedStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('Should have initial empty state', () => {
    const store = useNewsFeedStore()

    expect(store.mosFeedItems).toEqual([])
    expect(store.ivanovoFeedItems).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.isLoadingSource).toBe(false)
    expect(store.isLoadingAll).toBe(false)
  })

  it('Should load mos items when source is "mos"', async () => {
    const store = useNewsFeedStore()

    await store.loadBySource('mos')

    expect(store.mosFeedItems).toEqual(mockMosItems)
    expect(store.ivanovoFeedItems).toEqual([])
  })

  it('Should load ivanovo items when source is "ivanovo"', async () => {
    const store = useNewsFeedStore()

    await store.loadBySource('ivanovo')

    expect(store.ivanovoFeedItems).toEqual(mockIvanovoItems)
    expect(store.mosFeedItems).toEqual([])
  })

  it('Should load all items when source is undefined', async () => {
    const store = useNewsFeedStore()

    await store.loadBySource(undefined)

    expect(store.mosFeedItems).toEqual(mockMosItems)
    expect(store.ivanovoFeedItems).toEqual(mockIvanovoItems)
  })

  it('Should not reload mos items if already loaded', async () => {
    const { getMosNewsFeed } = await import('~/services/news-feed-adapter')
    const store = useNewsFeedStore()

    await store.loadBySource('mos')
    await store.loadBySource('mos')

    expect(getMosNewsFeed).toHaveBeenCalledTimes(1)
  })

  it('Should not reload ivanovo items if already loaded', async () => {
    const { getIvanovoNewsFeed } = await import('~/services/news-feed-adapter')
    const store = useNewsFeedStore()

    await store.loadBySource('ivanovo')
    await store.loadBySource('ivanovo')

    expect(getIvanovoNewsFeed).toHaveBeenCalledTimes(1)
  })

  it('Should reset all items', async () => {
    const store = useNewsFeedStore()

    await store.loadBySource(undefined)

    expect(store.mosFeedItems).toHaveLength(2)
    expect(store.ivanovoFeedItems).toHaveLength(2)

    store.resetAll()

    expect(store.mosFeedItems).toEqual([])
    expect(store.ivanovoFeedItems).toEqual([])
  })

  it('Should set isLoading to true while loading', async () => {
    const store = useNewsFeedStore()

    const loadPromise = store.loadBySource('mos')

    expect(store.isLoading).toBe(true)

    await loadPromise

    expect(store.isLoading).toBe(false)
  })

  it('Should set isLoadingAll to true while loading all', async () => {
    const store = useNewsFeedStore()

    const loadPromise = store.loadBySource(undefined)

    expect(store.isLoadingAll).toBe(true)

    await loadPromise

    expect(store.isLoadingAll).toBe(false)
  })

  it('Should compute isLoading from isLoadingSource and isLoadingAll', async () => {
    const store = useNewsFeedStore()

    expect(store.isLoading).toBe(false)

    store.isLoadingSource = true
    expect(store.isLoading).toBe(true)

    store.isLoadingSource = false
    store.isLoadingAll = true
    expect(store.isLoading).toBe(true)

    store.isLoadingAll = false
    expect(store.isLoading).toBe(false)
  })
})
