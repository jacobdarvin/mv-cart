<template>
  <div class="container mx-auto p-8">
    <nav class="flex justify-between items-center border p-4 rounded-lg">
      <div class="flex items-center gap-4">
        <h2 class="text-4xl font-bold">Cart</h2>
      </div>
      <button
        @click="goBack"
        class="bg-white border-black border rounded-lg p-2 px-4 flex items-center"
      >
        Back to Products
      </button>
    </nav>
    <div class="mt-4">
      <div v-if="cart.length > 0" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <div v-for="item in cart" :key="item.id" class="border flex flex-col gap-4 p-4 rounded-lg">
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
        <p class="text-2xl">Your cart is empty</p>
      </div>
      <div v-if="cart.length > 0" class="mt-4">
        <p>Total: $ {{ total }}</p>
        <button
          @click="confirmPurchase"
          class="bg-black border border-white hover:invert transition w-full text-white rounded-lg p-2"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const productStore = useProductStore()
    const router = useRouter()

    const cart = computed(() => productStore.cart)

    const total = computed(() => {
      return productStore.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    })

    const removeFromCart = (productId: number) => {
      productStore.removeFromCart(productId)
    }

    const confirmPurchase = async () => {
      const response = await fetch('http://localhost:4000/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1,
          items: productStore.cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity
          }))
        })
      })
      const data = await response.json()
      if (response.ok) {
        alert('Purchase confirmed!')
        productStore.clearCart()
      } else {
        alert('Failed to confirm purchase: ' + data.error)
      }
    }

    const goBack = () => {
      router.push('/')
    }

    return {
      cart,
      total,
      removeFromCart,
      confirmPurchase,
      goBack
    }
  }
})
</script>

<style scoped></style>
