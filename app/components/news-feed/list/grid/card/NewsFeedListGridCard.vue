<script setup lang="ts">
defineProps<{
  source: string
  title?: string
  description?: string
  link?: string
  pubDate?: string
}>()
</script>

<template>
  <article class="flex relative flex-col pb-10 md:pb-6 shadow-base h-full rounded-xl px-6 pt-7.5 bg-white">
    <h3
      v-if="title"
      class="text-lg text-blue-800 font-bold mb-6 line-clamp-3"
    >
      {{ title }}
    </h3>
    <p
      v-if="description"
      class="text-sm line-clamp-3 mb-5 flex-auto"
    >
      {{ description }}
    </p>
    <NuxtLink
      v-if="link"
      class="text-sm text-blue-600 underline"
      external
      :to="link"
      target="_blank"
    >
      Подробнее
    </NuxtLink>
    <div
      class="
        absolute md:static md:mt-5 inset-x-0 bottom-0 flex
        items-center py-1 rounded-xl justify-between gap-5 px-6 text-sm
        bg-gray-50 text-gray-300 md:bg-white md:py-0 md:px-0
      "
    >
      <span v-if="source">{{ source }}</span>
      <span v-if="pubDate">{{ pubDate }}</span>
    </div>
  </article>
</template>
