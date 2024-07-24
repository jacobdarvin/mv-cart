<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-8">
      <NavBar />
      <div class="mt-4">
        <h1 class="text-2xl font-bold mb-4">Purchases</h1>
        <div class="grid gap-4 grid-cols-1">
          <div
            v-for="purchase in purchases"
            :key="purchase.id"
            class="border p-4 rounded-lg bg-white shadow hover:shadow-lg transition"
          >
            <h2 class="text-xl font-bold">{{ purchase.id }}</h2>
            <p>Quantity: {{ purchase.quantity }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { usePurchaseStore } from '@/stores/purchaseStore'

import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: { NavBar },
  setup() {
    const purchaseStore = usePurchaseStore()

    onMounted(() => {
      purchaseStore.fetchPurchases()
    })

    const purchases = computed(() => purchaseStore.purchases)

    console.log(purchases)

    return {
      purchases
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
