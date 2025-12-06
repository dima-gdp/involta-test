export function useNewsFeedPagination<T>(
  items: Ref<T[]>,
  currentPage: Ref<number>,
  pageSize = 4,
) {
  const totalPages = computed(() => Math.ceil(items.value.length / pageSize))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return items.value.slice(start, end)
  })

  return {
    paginatedItems,
    totalPages,
    pageSize,
  }
}
