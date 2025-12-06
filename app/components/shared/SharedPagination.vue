<script setup lang="ts">
const currentPage = defineModel<number>()

const { totalPages } = defineProps<{
  totalPages: number
}>()

const pages = computed(() => {
  const current = currentPage.value ?? 1
  const result: (number | '...')[] = []

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(i)
    }
    return result
  }

  result.push(1)

  if (current <= 3) {
    // 1 2 3 4 ... 200
    result.push(2, 3, 4, '...', totalPages)
  }
  else if (current >= totalPages - 2) {
    // 1 ... 197 198 199 200
    result.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
  }
  else {
    // 1 ... 4 5 6 ... 200
    result.push('...', current - 1, current, current + 1, '...', totalPages)
  }

  return result
})

function onClickItem(item: number | string) {
  if (typeof item !== 'number') return

  if (item >= 1 && item <= totalPages) {
    currentPage.value = item
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      v-for="(item, index) in pages"
      :key="index"
      :disabled="item === '...'"
      type="button"
      class="min-w-8 h-8 flex items-center justify-center text-lg font-bold"
      :class="item === currentPage ? 'text-blue-700' : 'text-black cursor-pointer'"
      @click="onClickItem(item)"
    >
      {{ item }}
    </button>
  </div>
</template>
