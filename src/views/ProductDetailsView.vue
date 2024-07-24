<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-8">
      <NavBar />
      <div class="flex flex-col w-full mt-4 gap-4" v-if="product">
        <div class="bg-white border p-4 rounded-lg flex-1">
          <h2 class="text-4xl font-bold">{{ product.name }}</h2>
          <div>
            <p>{{ product.description }}</p>
            <p>$ {{ product.price }}</p>
            <p v-if="product.quantity">Quantity: {{ product.quantity }}</p>
          </div>
        </div>
        <div class="flex w-full gap-4">
          <router-link
            to="/"
            class="bg-white hover:invert w-full transition border border-black rounded-lg p-2 text-center"
          >
            Back to Products
          </router-link>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: { NavBar },
  setup() {
    const route = useRoute()
    const productStore = useProductStore()
    const product = ref<any>(null)

    onMounted(async () => {
      const productId = route.params.id as string
      const storeProduct = productStore.products.find((product) => product.id === productId)
      if (storeProduct) {
        product.value = storeProduct
      } else {
        product.value = await productStore.fetchProduct(productId)
      }
    })

    const addToCart = (product: any) => {
      productStore.addToCart(product)
    }

    return {
      product,
      addToCart
    }
  }
})
</script>

<style scoped></style>
