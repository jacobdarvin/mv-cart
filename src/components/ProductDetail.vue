<template>
  <div class="container mx-auto p-8">
    <NavBar />
    <div class="flex flex-col w-full mt-4 gap-4" v-if="product">
      <div class="border p-4 rounded-lg flex-1">
        <h2 class="text-4xl font-bold">{{ product.name }}</h2>
        <div>
          <p>{{ product.description }}</p>
          <p>$ {{ product.price }}</p>
          <p v-if="product.quantity">Quantity: {{ product.quantity }}</p>
        </div>
      </div>
      <div class="flex w-full gap-4">
        <button
          @click="goBack"
          class="bg-white hover:invert w-full transition border border-black rounded-lg p-2"
        >
          Back
        </button>
        <button
          @click="addToCart(product)"
          class="bg-black hover:invert w-full transition border border-white text-white rounded-lg p-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: { NavBar },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()
    const product = ref<any>(null)

    const fetchProduct = async (productId: number) => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${productId}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return await response.json()
      } catch (error) {
        console.error('Error fetching product:', error)
        return null
      }
    }

    onMounted(async () => {
      const productId = Number(route.params.id)
      const storeProduct = productStore.products.find((product) => product.id === productId)
      if (storeProduct) {
        product.value = storeProduct
      } else {
        product.value = await fetchProduct(productId)
      }
    })

    const addToCart = (product: any) => {
      productStore.addToCart(product)
    }

    const goBack = () => {
      router.push('/')
    }

    return {
      product,
      addToCart,
      goBack
    }
  }
})
</script>

<style scoped></style>
