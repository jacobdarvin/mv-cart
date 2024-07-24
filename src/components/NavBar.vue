<template>
  <nav class="flex justify-between items-center border p-4 rounded-lg bg-white">
    <div>
      <router-link to="/" class="col-span-1">
        <h2 class="text-4xl font-bold">🔥 COP'D</h2>
        <div class="flex">
          <p class="text-xs">
            /kɒpt/ the act of purchasing a new <span class="font-bold underline">release</span>
          </p>
        </div>
      </router-link>
    </div>
    <div class="flex flex-col">
      <div class="flex gap-3 items-center">
        <router-link to="/cart" class="underline">
          <span class="font-bold">{{ totalItems }}</span
          >&nbsp;Cart
        </router-link>
        <span class="font-bold">${{ balance }}</span>
      </div>
      <span @click="logout" class="underline text-xs text-right hover:cursor-pointer">Logout</span>
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
