<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  placeholder?: string
  disabled?: boolean
}>()
</script>

<template>
  <div class="relative">
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      class="shadow-base w-full px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
    <div class="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      <Icon
        name="mdi:search"
        class="text-2xl"
      />
    </div>
  </div>
</template>
