<template>
  <nav class="flex justify-between items-center border p-4 rounded-lg">
    <div class="flex items-center">
      <h2 class="text-4xl font-bold">Product Page</h2>
    </div>
    <div class="flex gap-2">
      <button
        class="bg-white border-black border hover:invert transition rounded-lg p-2 px-4 flex items-center"
      >
        Login
      </button>
      <button
        @click="viewCart"
        class="bg-white border-black border hover:invert transition rounded-lg p-2 px-4 flex items-center"
      >
        Cart
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const viewCart = () => {
      router.push('/cart')
    }

    return {
      viewCart
    }
  }
})
</script>

<style scoped></style>
