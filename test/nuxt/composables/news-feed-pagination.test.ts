import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useNewsFeedPagination } from '~/composables/news-feed/pagination'

describe('useNewsFeedPagination', () => {
  it('Should return correct totalPages', () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const currentPage = ref(1)

    const { totalPages } = useNewsFeedPagination(items, currentPage, 4)

    expect(totalPages.value).toBe(3)
  })

  it('Should return correct paginatedItems for first page', () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const currentPage = ref(1)

    const { paginatedItems } = useNewsFeedPagination(items, currentPage, 4)

    expect(paginatedItems.value).toEqual([1, 2, 3, 4])
  })

  it('Should return correct paginatedItems for second page', () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const currentPage = ref(2)

    const { paginatedItems } = useNewsFeedPagination(items, currentPage, 4)

    expect(paginatedItems.value).toEqual([5, 6, 7, 8])
  })

  it('Should return correct paginatedItems for last page with fewer items', () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const currentPage = ref(3)

    const { paginatedItems } = useNewsFeedPagination(items, currentPage, 4)

    expect(paginatedItems.value).toEqual([9, 10])
  })

  it('Should use default pageSize of 4', () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8])
    const currentPage = ref(1)

    const { pageSize, totalPages } = useNewsFeedPagination(items, currentPage)

    expect(pageSize).toBe(4)
    expect(totalPages.value).toBe(2)
  })

  it('Should return pageSize value', () => {
    const items = ref([1, 2, 3])
    const currentPage = ref(1)

    const { pageSize } = useNewsFeedPagination(items, currentPage, 10)

    expect(pageSize).toBe(10)
  })

  it('Should return empty array when items are empty', () => {
    const items = ref<number[]>([])
    const currentPage = ref(1)

    const { paginatedItems, totalPages } = useNewsFeedPagination(items, currentPage, 4)

    expect(paginatedItems.value).toEqual([])
    expect(totalPages.value).toBe(0)
  })

  it('Should update paginatedItems when currentPage changes', () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8])
    const currentPage = ref(1)

    const { paginatedItems } = useNewsFeedPagination(items, currentPage, 4)

    expect(paginatedItems.value).toEqual([1, 2, 3, 4])

    currentPage.value = 2

    expect(paginatedItems.value).toEqual([5, 6, 7, 8])
  })

  it('Should update totalPages when items change', () => {
    const items = ref([1, 2, 3, 4])
    const currentPage = ref(1)

    const { totalPages } = useNewsFeedPagination(items, currentPage, 4)

    expect(totalPages.value).toBe(1)

    items.value = [1, 2, 3, 4, 5, 6, 7, 8]

    expect(totalPages.value).toBe(2)
  })

  it('Should return 1 totalPage when items fit in one page', () => {
    const items = ref([1, 2, 3])
    const currentPage = ref(1)

    const { totalPages } = useNewsFeedPagination(items, currentPage, 4)

    expect(totalPages.value).toBe(1)
  })

  it('Should work with custom pageSize', () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const currentPage = ref(1)

    const { paginatedItems, totalPages } = useNewsFeedPagination(items, currentPage, 3)

    expect(paginatedItems.value).toEqual([1, 2, 3])
    expect(totalPages.value).toBe(4)
  })
})
