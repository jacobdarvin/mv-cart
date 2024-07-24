<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-8">
      <NavBar />
      <div class="mt-4">
        <div class="border rounded-lg bg-white p-4 mb-4">
          <h1 class="text-2xl font-bold">Top-up</h1>
        </div>
        <div class="border rounded-lg bg-white p-8">
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="cardNumber" class="block text-sm font-medium text-gray-700"
                >Card Number</label
              >
              <input
                type="text"
                id="cardNumber"
                v-model="cardNumber"
                placeholder="1234 5678 9012 3456"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                required
              />
            </div>
            <div class="mb-4">
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                v-model="address"
                placeholder="123 Main St, City, Country"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                required
              />
            </div>
            <div class="mb-4 flex space-x-4">
              <div class="flex-1">
                <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
                <input
                  type="text"
                  id="cvc"
                  v-model="cvc"
                  placeholder="123"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  required
                />
              </div>
              <div class="flex-1">
                <label for="expirationDate" class="block text-sm font-medium text-gray-700"
                  >Expiration Date</label
                >
                <input
                  type="text"
                  id="expirationDate"
                  v-model="expirationDate"
                  placeholder="MM/YY"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div class="mb-4">
              <label for="amount" class="block text-sm font-medium text-gray-700"
                >Amount to Top-up</label
              >
              <input
                type="number"
                id="amount"
                v-model="amount"
                placeholder="1000"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                class="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Top-up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { NavBar },
  setup() {
    const cardNumber = ref('')
    const cvc = ref('')
    const expirationDate = ref('')
    const amount = ref<number | null>(null)
    const address = ref('')

    const handleSubmit = () => {
      // Handle the form submission logic here
      console.log('Top-up details:', {
        cardNumber: cardNumber.value,
        cvc: cvc.value,
        expirationDate: expirationDate.value,
        amount: amount.value,
        address: address.value
      })
    }

    return { cardNumber, cvc, expirationDate, amount, address, handleSubmit }
  }
})
</script>

<style scoped></style>
