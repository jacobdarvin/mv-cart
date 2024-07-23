<template>
  <nav class="flex justify-between items-center border p-4 rounded-lg">
    <div class="flex items-center">
      <h2 class="text-4xl font-bold">Product Page</h2>
    </div>
    <div class="flex gap-2">
      <button
        @click="viewCart"
        class="bg-white border-black border hover:invert transition rounded-lg p-2 px-4 flex items-center"
      >
        <span class="font-bold">{{ totalItems }}</span
        >&nbsp;Cart
      </button>
      <button
        class="bg-white border-black border hover:invert transition rounded-lg p-2 px-4 flex items-center"
      >
        Login
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

export default defineComponent({
  setup() {
    const productStore = useProductStore()
    const router = useRouter()

    const totalItems = computed(() => productStore.totalItemsInCart)

    const viewCart = () => {
      router.push('/cart')
    }

    return {
      totalItems,
      viewCart
    }
  }
})
</script>

<style scoped></style>
