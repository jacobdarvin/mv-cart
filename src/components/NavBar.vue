<template>
  <nav class="flex justify-between items-center border p-4 rounded-lg">
    <div class="flex items-center">
      <h2 class="text-4xl font-bold">Product Page</h2>
    </div>
    <div class="flex gap-2 items-center">
      <router-link to="/cart" class="underline">
        <span class="font-bold">{{ totalItems }}</span
        >&nbsp;Cart
      </router-link>
      <button
        @click="logout"
        class="bg-white border border-black hover:invert transition rounded-lg p-2 px-4 ml-4"
      >
        Logout
      </button>
    </div>
  </nav>
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
    const router = useRouter()

    const totalItems = computed(() => productStore.totalItemsInCart)

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    return {
      totalItems,
      logout
    }
  }
})
</script>

<style scoped></style>
