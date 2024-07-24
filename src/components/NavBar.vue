<template>
  <nav class="flex justify-between items-center border p-4 rounded-lg">
    <div class="flex items-center">
      <h2 class="text-4xl font-bold">Product Page</h2>
    </div>
    <div class="flex gap-2">
      <router-link to="/cart" class="underline">
        <span class="font-bold">{{ totalItems }}</span
        >&nbsp;Cart
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

export default defineComponent({
  setup() {
    const productStore = useProductStore()

    const totalItems = computed(() => productStore.totalItemsInCart)

    return {
      totalItems
    }
  }
})
</script>

<style scoped></style>
