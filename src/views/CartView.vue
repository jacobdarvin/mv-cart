<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-8">
      <nav class="flex justify-between items-center border p-4 rounded-lg bg-white">
        <div class="flex items-center gap-4">
          <h2 class="text-4xl font-bold">Cart</h2>
        </div>
        <router-link
          to="/"
          class="bg-white border-black border hover:invert transition rounded-lg p-2 px-4 flex items-center"
        >
          Back to Products
        </router-link>
      </nav>
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
            <h2 class="text-xl font-bold">{{ item.name }}</h2>
            <div>
              <p>$ {{ item.price }}</p>
              <p>Quantity: {{ item.quantity }}</p>
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

export default defineComponent({
  setup() {
    const productStore = useProductStore()
    const authStore = useAuthStore()
    const cart = computed(() => productStore.cart)
    const router = useRouter()

    const confirmPurchase = async () => {
      // Extra frontend validation for checking if logged in.
      if (!authStore.isAuthenticated) {
        alert('You must be logged in to make a purchase.')
        router.push('/login')
        return
      }

      try {
        for (const item of cart.value) {
          const response = await fetch('http://localhost:4000/api/purchases', {
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
          console.log('Purchase confirmed for:', data)
        }
        productStore.clearCart()
        alert('Purchase confirmed!')
        router.push('/') // Update this to use success page
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

<style scoped></style>
