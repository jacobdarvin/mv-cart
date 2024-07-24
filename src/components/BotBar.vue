<template>
  <nav class="flex justify-between items-center border p-4 rounded-lg bg-white mt-4">
    <div class="flex gap-4">
      <router-link
        to="/purchases"
        class="underline text-right hover:cursor-pointer hover:text-gray-600"
      >
        Your Purchases
      </router-link>
      <button @click="logout" class="underline text-right hover:cursor-pointer hover:text-gray-600">
        Logout
      </button>
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
