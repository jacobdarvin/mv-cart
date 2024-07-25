<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-8">
      <NavBar />
      <div class="mt-4">
        <div
          v-if="cart.length > 0"
          class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4"
        >
          <div
            v-for="item in cart"
            :key="item.id"
            class="border flex flex-col gap-4 p-4 rounded-lg bg-white"
          >
            <div class="relative aspect-square">
              <img
                :src="item.image"
                alt="Product Image"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 class="text-xl font-bold">{{ item.name }}</h2>
            <div class="text-2xl font-semibold">
              <p>${{ item.price }} x {{ item.quantity }}</p>
            </div>
            <button
              @click="removeFromCart(item.id)"
              class="bg-white border border-black hover:invert transition rounded-lg p-2"
            >
              (-) Remove from Cart
            </button>
          </div>
        </div>
        <div v-else>
          <p class="text-2xl">Your cart is empty.</p>
        </div>
        <div v-if="cart.length > 0" class="mt-4">
          <p class="text-4xl">
            Total: <span class="font-bold">${{ total }}</span>
          </p>
          <button
            @click="confirmPurchase"
            class="bg-black border border-white hover:invert transition w-full text-white rounded-lg p-2 mt-4"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: { NavBar },
  setup() {
    const productStore = useProductStore()
    const authStore = useAuthStore()
    const cart = computed(() => productStore.cart)
    const router = useRouter()

    const confirmPurchase = async () => {
      if (!authStore.isAuthenticated) {
        alert('You must be logged in to make a purchase.')
        router.push('/login')
        return
      }

      try {
        for (const item of cart.value) {
          const response = await fetch('http://127.0.0.1:4000/api/purchases', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authStore.token}`
            },
            body: JSON.stringify({
              purchase: {
                product_id: item.id,
                quantity: item.quantity
              }
            })
          })

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
          }

          const data = await response.json()
          authStore.fetchBalance()
          console.log('Purchase confirmed for:', data)
        }
        productStore.addPurchasedItems(cart.value)
        productStore.clearCart()
        router.push('/success')
      } catch (error) {
        console.error('Error confirming purchase:', error)
        alert('There was an error processing your purchase. Please try again.')
      }
    }

    const total = computed(() => {
      return productStore.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    })

    const removeFromCart = (productId: string) => {
      productStore.removeFromCart(productId)
    }

    return {
      cart,
      total,
      removeFromCart,
      confirmPurchase
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
