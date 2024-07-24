<!-- src/views/LoginView.vue -->
<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
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
            class="w-full flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const login = async () => {
      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email.value, password: password.value })
        })
        const data = await response.json()
        if (data.success) {
          localStorage.setItem('session', JSON.stringify(data.session))
          router.push('/')
        } else {
          alert('Invalid credentials')
        }
      } catch (error) {
        console.error('Error during login:', error)
      }
    }

    return { email, password, login }
  }
}
</script>
