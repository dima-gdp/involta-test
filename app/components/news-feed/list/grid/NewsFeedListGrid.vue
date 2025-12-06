<script lang="ts" setup>
import type { NewsFeedItem } from '~/domain/news-feed/types/news-feed-item'

defineProps<{
  items: NewsFeedItem[]
}>()
</script>

<template>
  <ul class="grid gap-5 md:grid-cols-2">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="h-full"
    >
      <NewsFeedListGridCard
        :title="item.title"
        :description="item.description"
        :link="item.link"
        :pub-date="item.pubDate"
        :source="item.source"
      />
    </li>
  </ul>
</template>
