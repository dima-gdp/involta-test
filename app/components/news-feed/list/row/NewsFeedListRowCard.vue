<script setup lang="ts">
import type { NewsFeedSourceValue } from '~/domain/news-feed/news-feed-item'

defineProps<{
  source: NewsFeedSourceValue
  title?: string
  description?: string
  link?: string
  pubDate?: string
  imageSrc?: string
}>()
</script>

<template>
  <article class="flex flex-col shadow-base h-full rounded-sm pt-7.5 bg-white">
    <div class="flex flex-col px-6 md:flex-row md:gap-7.5">
      <div
        v-if="imageSrc"
        class="mb-5 shrink-0"
      >
        <NuxtImg
          class="w-84.5 h-41.5 md:w-50 md:h-25"
          width="338"
          height="166"
          :src="imageSrc"
          sizes="366px md:200px"
          alt="Изображение новости"
        />
      </div>
      <div>
        <h3
          v-if="title"
          class="text-lg text-blue-800 font-bold mb-6 line-clamp-3 md:line-clamp-2"
        >
          {{ title }}
        </h3>
        <p
          v-if="description"
          class="text-sm line-clamp-3 mb-5 md:line-clamp-2"
        >
          {{ description }}
        </p>
        <NuxtLink
          v-if="link"
          class="text-sm text-blue-600 underline md:hidden"
          external
          :to="link"
          target="_blank"
        >
          Подробнее
        </NuxtLink>
      </div>
    </div>

    <div
      class="
        flex px-6 mt-4
        items-center py-1 rounded-sm justify-between gap-5 text-sm
        bg-gray-50 text-gray-300
      "
    >
      <span v-if="source">{{ source }}</span>
      <span v-if="pubDate">{{ pubDate }}</span>
    </div>
  </article>
</template>
