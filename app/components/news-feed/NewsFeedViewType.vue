<script setup lang="ts">
import type { NewsFeedViewType } from '~/domain/news-feed/types'

const model = defineModel<NewsFeedViewType>()

const viewTypes: { value: NewsFeedViewType, icon: string }[] = [
  { value: 'list', icon: 'inv:row-blocks' },
  { value: 'grid', icon: 'inv:grid-blocks' },
]
</script>

<template>
  <div class="flex items-center gap-2.5">
    <label
      v-for="viewType in viewTypes"
      :key="viewType.value"
      class="cursor-pointer flex items-center justify-center"
      :class="[
        model === viewType.value
          ? 'text-blue-700'
          : 'text-gray-200 hover:text-blue-700',
      ]"
    >
      <input
        v-model="model"
        type="radio"
        :value="viewType.value"
        class="sr-only"
      >
      <Icon
        :name="viewType.icon"
        class="text-lg"
      />
    </label>
  </div>
</template>
