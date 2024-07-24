<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-8">
      <NavBar />
      <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="border flex flex-col p-4 rounded-lg hover:cursor-pointer transition hover:shadow-lg bg-white"
          @click="viewProduct(product.id)"
        >
          <div class="relative aspect-square">
            <img
              :src="product.image"
              alt="Product Image"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h2 class="text-xl font-bold">{{ product.name }}</h2>
          <p>${{ product.price }} • {{ product.quantity }} left in stock</p>
          <button
            @click.stop="viewProduct(product.id)"
            class="bg-black hover:invert transition border border-white text-white rounded-lg p-2 mt-2"
          >
            View Product
          </button>
        </div>
      </div>
      <BotBar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import NavBar from '@/components/NavBar.vue'
import BotBar from '@/components/BotBar.vue'

export default defineComponent({
  components: { NavBar, BotBar },
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

<style scoped>
.aspect-square img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
