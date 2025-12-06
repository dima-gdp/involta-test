import { defineStore } from 'pinia'
import { getIvanovoNewsFeed, getMosNewsFeed } from '~/services/news-feed-adapter'
import type { RssCustomItem } from '~/domain/rss/types/rss-custom'
import type { NewsFeedSourceKey } from '~/domain/news-feed/news-feed-item'

export const useNewsFeedStore = defineStore('news-feed', () => {
  const isLoadingSource = ref(false)
  const isLoadingAll = ref(false)

  const mosFeedItems = shallowRef<RssCustomItem[]>([])
  const ivanovoFeedItems = shallowRef<RssCustomItem[]>([])

  async function loadMosItems() {
    if (mosFeedItems.value.length) return

    try {
      isLoadingSource.value = true
      mosFeedItems.value = await getMosNewsFeed()
    }
    finally {
      isLoadingSource.value = false
    }
  }

  async function loadIvanovoItems() {
    if (ivanovoFeedItems.value.length) return

    try {
      isLoadingSource.value = true
      ivanovoFeedItems.value = await getIvanovoNewsFeed()
    }
    finally {
      isLoadingSource.value = false
    }
  }

  async function loadAllItems() {
    if (mosFeedItems.value.length && ivanovoFeedItems.value.length) return

    try {
      isLoadingAll.value = true
      await Promise.all([loadMosItems(), loadIvanovoItems()])
    }
    finally {
      isLoadingAll.value = false
    }
  }

  async function loadBySource(source?: NewsFeedSourceKey) {
    if (source === 'mos') {
      await loadMosItems()
    }
    else if (source === 'ivanovo') {
      await loadIvanovoItems()
    }
    else {
      await loadAllItems()
    }
  }

  const isLoading = computed(() => {
    return isLoadingSource.value || isLoadingAll.value
  })

  async function resetAll() {
    mosFeedItems.value = []
    ivanovoFeedItems.value = []
  }

  return {
    mosFeedItems,
    ivanovoFeedItems,
    isLoading,
    isLoadingSource,
    isLoadingAll,
    loadBySource,
    resetAll,
  }
})
