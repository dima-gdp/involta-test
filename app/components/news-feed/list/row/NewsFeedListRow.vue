<script lang="ts" setup>
import type { NewsFeedItem } from '~/domain/news-feed/types/news-feed-item'

defineProps<{
  items: NewsFeedItem[]
}>()
</script>

<template>
  <ul class="grid gap-5">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="h-full"
    >
      <NewsFeedListRowCard
        :title="item.title"
        :description="item.description"
        :link="item.link"
        :pub-date="item.pubDate"
        :source="item.source"
        :image-src="item.imageSrc"
      />
    </li>
  </ul>
</template>
