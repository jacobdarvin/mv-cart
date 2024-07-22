<template>
  <nav class="flex justify-between items-center border p-4 rounded-lg shadow">
    <div class="flex items-center gap-4">
      <h2 class="text-4xl font-bold">Product Page</h2>
    </div>
    <button class="bg-black text-white rounded-lg p-2 px-8 flex items-center">View Cart</button>
  </nav>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
    <div
      v-for="product in products"
      :key="product.id"
      class="border flex flex-col gap-4 p-4 rounded-lg shadow"
    >
      <h2 class="text-xl font-bold">{{ product.name }}</h2>
      <div>
        <p>{{ product.description }}</p>
        <p>$ {{ product.price }}</p>
      </div>
      <button class="bg-black text-white rounded-lg p-2">Add to Cart</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const products = ref([
      { id: 1, name: 'Sample Product 1', description: 'Description 1', price: 100 },
      { id: 2, name: 'Sample Product 2', description: 'Description 2', price: 200 },
      { id: 3, name: 'Sample Product 3', description: 'Description 3', price: 300 },
      { id: 4, name: 'Sample Product 4', description: 'Description 4', price: 400 },
      { id: 5, name: 'Sample Product 5', description: 'Description 5', price: 500 },
      { id: 6, name: 'Sample Product 6', description: 'Description 6', price: 600 }
    ])

    return {
      products
    }
  }
})
</script>

<style scoped></style>
