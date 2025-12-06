<script setup lang="ts">
import type { NewsFeedSourceKey } from '~/domain/news-feed/news-feed-item'

const model = defineModel<NewsFeedSourceKey>({ required: false })

const sources: { value: NewsFeedSourceKey | undefined, label: string }[] = [
  { value: undefined, label: 'Все' },
  { value: 'mos', label: 'Mos.ru' },
  { value: 'ivanovo', label: 'Ivanovo' },
]
</script>

<template>
  <div class="flex gap-4">
    <label
      v-for="source in sources"
      :key="source.value ?? 'all'"
      class="font-bold text-sm cursor-pointer"
      :class="
        model === source.value
          ? 'text-black'
          : 'text-blue-500 hover:text-black'
      "
      @click="model = source.value"
    >
      <input
        v-model="model"
        type="radio"
        :value="source.value"
        class="sr-only"
      >
      {{ source.label }}
    </label>
  </div>
</template>
