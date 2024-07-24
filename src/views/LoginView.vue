<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-2 bg-white rounded-lg shadow-md">
      <p class="text-4xl font-bold">• Login</p>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <div class="mt-1">
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="Password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-white rounded-md shadow-sm hover:invert transition"
          >
            Login
          </button>
        </div>
      </form>
      <div class="text-center">
        <router-link to="/register" class="text-gray-600 hover:text-gray-900 underline"
          >Don't have an account? Register here.</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    const login = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: { email: email.value, password: password.value }
          })
        })

        if (response.status === 200) {
          const data = await response.json()
          authStore.login(data.token)
          router.push('/')
        } else if (response.status === 401) {
          alert('Invalid credentials')
        } else {
          alert('An error occurred. Please try again.')
        }
      } catch (error) {
        console.error('Error during login:', error)
        alert('An error occurred. Please try again.')
      }
    }

    return { email, password, login }
  }
}
</script>
