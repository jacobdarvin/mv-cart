<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-8">
      <NavBar />
      <div class="mt-4">
        <div class="border rounded-lg bg-white flex p-4 mb-4">
          <h1 class="text-2xl font-bold">Purchases</h1>
        </div>
        <div class="grid gap-4 grid-cols-1">
          <div
            v-for="purchase in purchases"
            :key="purchase.id"
            class="border p-4 rounded-lg bg-white flex"
          >
            <img
              :src="purchase.product?.image"
              alt="Product Image"
              class="w-24 h-24 object-cover mr-4"
            />

            <div class="flex flex-col justify-between">
              <div>
                <h2 class="text-xl font-bold">{{ purchase.product?.name }}</h2>
                <p class="text-gray-600">
                  {{ purchase.quantity }} x ${{ purchase.product?.price.toFixed(2) }}
                </p>
              </div>
              <p class="text-gray-500 text-sm">Purchase ID: {{ purchase.id }}</p>
            </div>
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
