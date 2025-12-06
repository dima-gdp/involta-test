<script setup lang="ts">
import { useNewsFeed } from '~/composables/news-feed'
import { useNewsFeedStore } from '~/stores/news-feed'
import { useNewsFeedViewType } from '~/composables/news-feed/view-type'
import { useMounted } from '@vueuse/core'

const newsFeedStore = useNewsFeedStore()

const { filter, currentPage, resetFilter, items, totalPages } = useNewsFeed()

// Загрузка данных при изменении source
watch(() => filter.value.source, async (val) => {
  try {
    isError.value = false
    await newsFeedStore.loadBySource(val)
  }
  catch {
    isError.value = true
  }
})

const isError = ref(false)
const isInitialLoading = ref(false)

await callOnce('feed-store', async () => {
  try {
    isError.value = false
    isInitialLoading.value = true
    await newsFeedStore.loadBySource(filter.value.source)
  }
  catch {
    // Тут могла быть обработка ошибки
    isError.value = true
  }
  finally {
    isInitialLoading.value = false
  }
}, { mode: 'navigation' })

const { viewType } = useNewsFeedViewType()

const isMounted = useMounted()

async function onReset() {
  try {
    isError.value = false
    newsFeedStore.resetAll()
    resetFilter()
    await newsFeedStore.loadBySource()
  }
  catch {
    isError.value = true
  }
}
</script>

<template>
  <main class="container mx-auto py-7">
    <NewsFeedHeader
      v-model="filter.search"
      :disabled-reset-btn="isInitialLoading"
      @reset="onReset"
    />

    <div class="flex items-center justify-between gap-5 mt-4">
      <NewsFeedSourcePicker v-model="filter.source" />
      <NewsFeedViewType v-if="isMounted" v-model="viewType" />
      <div v-else class="flex items-center gap-2">
        <SharedSkeleton
          v-for="i in 2"
          :key="i"
          class="size-4.5"
        />
      </div>
    </div>

    <div class="mt-3">
      <!--  Загрузку покажем на клиенте, ведь вывод списка зависит от localStorage(ТЗ) -->
      <div
        v-if="isInitialLoading || newsFeedStore.isLoading || !isMounted"
        class="text-center py-12 text-gray-500"
      >
        Загрузка
      </div>

      <h4 v-else-if="isError" class="text-center py-12 text-gray-500">
        Произошла ошибка при загрузке новостей
      </h4>

      <div
        v-else-if="items.length"
        class="mb-6"
      >
        <div>
          <LazyNewsFeedListGrid
            v-if="viewType === 'grid'"
            :items="items"
          />
          <LazyNewsFeedListRow
            v-else
            :items="items"
          />
        </div>

        <div class="flex justify-center mt-12">
          <SharedPagination
            v-model="currentPage"
            :total-pages="totalPages"
          />
        </div>
      </div>

      <h4
        v-else
        class="text-center py-12 text-gray-500"
      >
        Новости не найдены
      </h4>
    </div>
  </main>
</template>
