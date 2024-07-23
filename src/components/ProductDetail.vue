<template>
  <div class="container mx-auto p-8">
    <NavBar />
    <div class="flex flex-col w-full mt-4 gap-4">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: { NavBar },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()

    const product = computed(() => {
      const productId = Number(route.params.id)
      return productStore.products.find((product) => product.id === productId)
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
