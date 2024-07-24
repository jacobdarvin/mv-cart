<template>
  <nav class="flex justify-between items-center border p-4 rounded-lg bg-white">
    <h2 class="text-4xl font-bold">Product Page</h2>
    <div class="flex gap-4 items-center">
      <button @click="logout" class="underline">Logout</button>
      <router-link to="/cart" class="underline">
        <span class="font-bold">{{ totalItems }}</span
        >&nbsp;Cart
      </router-link>
      <span class="font-bold">${{ balance }}</span>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const productStore = useProductStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const totalItems = computed(() => productStore.totalItemsInCart)
    const balance = computed(() => authStore.balance)

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    onMounted(() => {
      if (authStore.isAuthenticated) {
        authStore.fetchBalance()
      }
    })

    return {
      totalItems,
      balance,
      logout
    }
  }
})
</script>

<style scoped></style>
