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

  function getQuery(page?: string) {
    return {
      source: filter.value.source || undefined,
      search: filter.value.search || undefined,
      page,
    }
  }

  // Синхронизация filter -> URL
  watch(filter, async () => {
    const query = getQuery()
    await router.replace({ query })

    // Сбрасываем page при изменении фильтров
    currentPage.value = 1
  }, { deep: true })

  watch(currentPage, async (newPage) => {
    const page = newPage > 1 ? String(newPage) : undefined
    const query = getQuery(page)

    await router.replace({ query })
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
