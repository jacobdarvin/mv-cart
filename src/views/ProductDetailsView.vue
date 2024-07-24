<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-8">
      <NavBar />
      <div class="flex flex-col w-full mt-4 gap-4" v-if="product">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
          <div class="bg-white border p-4 rounded-lg relative">
            <div class="relative aspect-square">
              <img
                :src="product.image"
                alt="Product Image"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 class="text-4xl font-bold mt-2">{{ product.name }}</h2>
            <p class="mt-2">${{ product.price }} • {{ product.quantity }} left in stock</p>
          </div>

          <div
            class="bg-white border p-4 rounded-lg lg:col-span-2 relative overflow-hidden min-h-24 pb-28"
          >
            <div
              v-if="cartQuantity > 0"
              class="absolute bottom-0 right-0 text-6xl font-bold p-8 marquee"
            >
              COP'D {{ cartQuantity }} * COP'D {{ cartQuantity }} * COP'D {{ cartQuantity }} * COP'D
              {{ cartQuantity }} * COP'D {{ cartQuantity }} * COP'D {{ cartQuantity }} *
            </div>
            <p>{{ product.description }}</p>
          </div>
        </div>
        <div
          :class="
            cartQuantity === 0 ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-1 md:grid-cols-2 gap-2'
          "
        >
          <button
            @click="addToCart(product)"
            :disabled="isAddToCartDisabled"
            class="bg-black hover:invert transition border border-white text-white rounded-lg p-2 disabled:opacity-25 disabled:invert"
          >
            Add to Cart
          </button>
          <button
            @click="removeFromCart(product.id)"
            v-if="cartQuantity > 0"
            class="bg-black hover:invert transition border border-white text-white rounded-lg p-2"
          >
            Remove from Cart
          </button>
        </div>
        <div v-if="cartQuantity > 0" class="flex w-full">
          <router-link
            to="/cart"
            class="bg-white w-full transition border border-black rounded-lg p-2 text-center"
          >
            Proceed to Checkout
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
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
      productStore.addToCart(product, 1)
    }

    const removeFromCart = (productId: string) => {
      productStore.removeFromCart(productId)
    }

    const cartQuantity = computed(() => {
      const cartItem = productStore.cart.find((item) => item.id === product.value.id)
      return cartItem ? cartItem.quantity : 0
    })

    const isAddToCartDisabled = computed(() => {
      const cartItem = productStore.cart.find((item) => item.id === product.value.id)
      const cartQuantity = cartItem ? cartItem.quantity : 0
      return cartQuantity >= product.value.quantity
    })

    return {
      product,
      addToCart,
      removeFromCart,
      cartQuantity,
      isAddToCartDisabled
    }
  }
})
</script>

<style scoped>
.hover\:invert:hover {
  filter: invert(100%);
}

.marquee {
  white-space: nowrap;
  overflow: hidden;
  animation: marquee 15s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.aspect-square img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
