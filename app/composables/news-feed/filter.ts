import type { NewsFeedSourceKey } from '~/domain/news-feed/news-feed-item'

export interface NewsFeedFilter {
  source?: NewsFeedSourceKey
  search: string
}

const validSources: NewsFeedSourceKey[] = ['mos', 'ivanovo']

function isValidSource(value: unknown): value is NewsFeedSourceKey {
  return typeof value === 'string' && validSources.includes(value as NewsFeedSourceKey)
}

export function useNewsFeedFilter() {
  const route = useRoute()
  const router = useRouter()

  // Инициализация из query params
  const filter = ref<NewsFeedFilter>({
    // Если источник не валидный, то покажем все новости
    source: isValidSource(route.query.source) ? route.query.source : undefined,
    search: route.query.search as string,
  })

  const currentPage = ref(Number(route.query.page) || 1)

  // Синхронизация filter -> URL
  watch(filter, (newFilter) => {
    const query = { ...route.query }

    if (newFilter.source) {
      query.source = newFilter.source
    }
    else {
      delete query.source
    }

    if (newFilter.search) {
      query.search = newFilter.search
    }
    else {
      delete query.search
    }

    // Сбрасываем page при изменении фильтров
    currentPage.value = 1

    router.replace({ query })
  }, { deep: true })

  watch(currentPage, (newPage) => {
    const query = { ...route.query }

    if (newPage > 1) {
      query.page = String(newPage)
    }
    else {
      delete query.page
    }

    router.replace({ query })
  })

  function resetFilter() {
    filter.value = {
      source: undefined,
      search: '',
    }
    currentPage.value = 1
  }

  return {
    filter,
    currentPage,
    resetFilter,
  }
}
