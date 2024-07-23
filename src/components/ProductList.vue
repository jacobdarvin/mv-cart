<template>
  <div>
    <nav class="flex justify-between items-center border p-4 rounded-lg">
      <div class="flex items-center gap-4">
        <h2 class="text-4xl font-bold">Product Page</h2>
      </div>
      <button
        @click="viewCart"
        class="bg-white border-black border rounded-lg p-2 px-4 flex items-center"
      >
        Cart
      </button>
    </nav>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border flex flex-col gap-4 p-4 rounded-lg"
      >
        <h2 class="text-xl font-bold">{{ product.name }}</h2>
        <div>
          <p>{{ product.description }}</p>
          <p>$ {{ product.price }}</p>
        </div>
        <button
          @click="addToCart(product)"
          class="bg-black hover:bg-white hover:text-black hover:border-black border border-white text-white rounded-lg p-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'

interface Product {
  id: number
  name: string
  description: string
  price: number
  quantity: number
}

export default defineComponent({
  setup() {
    const productStore = useProductStore()

    onMounted(() => {
      productStore.fetchProducts()
    })

    const products = computed(() => productStore.products)

    const addToCart = (product: Product) => {
      productStore.addToCart(product)
    }

    const viewCart = () => {}

    return {
      products,
      addToCart,
      viewCart
    }
  }
})
</script>

<style scoped></style>
