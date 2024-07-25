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
              <label for="cardholderName" class="block text-sm font-medium text-gray-700"
                >Cardholder's Name</label
              >
              <input
                type="text"
                id="cardholderName"
                v-model="cardholderName"
                placeholder="John Doe"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                required
              />
            </div>
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
          <div v-if="successMessage" class="mt-4 text-emerald-500 font-bold">
            Top-up successful. Enjoy your balance!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

export default defineComponent({
  components: { NavBar },
  setup() {
    const authStore = useAuthStore()

    const cardholderName = ref('')
    const cardNumber = ref('')
    const cvc = ref('')
    const expirationDate = ref('')
    const amount = ref<number | null>(null)
    const address = ref('')
    const successMessage = ref(false)

    const handleSubmit = async () => {
      const topUpDetails = {
        cardholderName: cardholderName.value,
        cardNumber: cardNumber.value,
        cvc: cvc.value,
        expirationDate: expirationDate.value,
        amount: amount.value,
        address: address.value
      }

      console.log('Top-up details:', topUpDetails)

      try {
        const response = await fetch('http://127.0.0.1:4000/api/wallets/top_up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.token}`
          },
          body: JSON.stringify({ wallet: { amount: topUpDetails.amount?.toFixed(2) } })
        })

        if (!response.ok) {
          throw new Error('Failed to top-up')
        }

        authStore.fetchBalance()
        successMessage.value = true
      } catch (error) {
        alert('Top-up error!')
      }
    }

    return {
      cardholderName,
      cardNumber,
      cvc,
      expirationDate,
      amount,
      address,
      handleSubmit,
      successMessage
    }
  }
})
</script>

<style scoped></style>
