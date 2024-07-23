<template>
  <div class="container mx-auto p-8">
    <NavBar />
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border flex flex-col gap-4 p-4 rounded-lg hover:cursor-pointer transition hover:scale-105 hover:shadow-lg"
        @click="viewProduct(product.id)"
      >
        <h2 class="text-xl font-bold">{{ product.name }}</h2>
        <div>
          <p>{{ product.description }}</p>
          <p>$ {{ product.price }}</p>
        </div>
        <button
          @click.stop="viewProduct(product.id)"
          class="bg-black hover:invert transition border border-white text-white rounded-lg p-2"
        >
          View Product
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: { NavBar },
  setup() {
    const productStore = useProductStore()
    const router = useRouter()

    onMounted(() => {
      productStore.fetchProducts()
    })

    const products = computed(() => productStore.products)

    const viewProduct = (id: string) => {
      router.push(`/product/${id}`)
    }

    return {
      products,
      viewProduct
    }
  }
})
</script>

<style scoped></style>
