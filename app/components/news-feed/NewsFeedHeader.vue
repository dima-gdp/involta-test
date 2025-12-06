<script setup lang="ts">
const search = defineModel<string>()

const { disabledResetBtn } = defineProps<{
  disabledResetBtn?: boolean
}>()

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between gap-5 pb-6 border-b border-gray-300">
    <div class="flex justify-between gap-5 items-center">
      <h1 class="text-2xl font-bold">
        Список новостей
      </h1>
      <button
        class="text-blue-800 text-2xl size-10 rounded-full bg-white shadow-base flex items-center justify-center"
        type="button"
        :disabled="disabledResetBtn"
        data-testid="reset-btn"
        @click="emit('reset')"
      >
        <Icon name="dashicons:update" />
      </button>
    </div>
    <SharedSearchInput v-model="search" data-testid="search-input" />
  </div>
</template>
