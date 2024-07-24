<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-8">
      <NavBar />
      <div class="mt-4">
        <h1 class="text-3xl font-bold mb-4">Purchase Successful!</h1>
        <p class="text-xl mb-4">Thank you for your purchase. Here are the details of your order:</p>
        <div
          v-if="purchasedItems.length > 0"
          class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4"
        >
          <div
            v-for="item in purchasedItems"
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
          </div>
        </div>
        <div v-else>
          <p class="text-2xl">No items found in your purchase.</p>
        </div>
        <div class="mt-4">
          <button
            @click="goToHome"
            class="bg-black border border-white hover:invert transition w-full text-white rounded-lg p-2 mt-4"
          >
            Go to Home
          </button>
          <router-link to="/purchases">
            <button
              class="bg-white border border-black hover:invert transition w-full rounded-lg p-2 mt-4"
            >
              Your Purchases
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: { NavBar },
  setup() {
    const productStore = useProductStore()
    const purchasedItems = computed(() => productStore.purchasedItems)
    const router = useRouter()

    const goToHome = () => {
      router.push('/')
    }

    onMounted(() => {
      if (purchasedItems.value.length === 0) {
        router.push('/')
      }
    })

    return {
      purchasedItems,
      goToHome
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
