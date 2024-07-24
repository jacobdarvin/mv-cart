<!-- src/views/RegisterView.vue -->
<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Register</h2>
      <form @submit.prevent="register" class="space-y-6">
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
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <div class="mt-1">
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
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
            Register
          </button>
        </div>
      </form>
      <div class="text-center">
        <router-link to="/login" class="text-gray-600 hover:text-gray-900 underline"
          >Already have an account? Login here.</router-link
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
    const confirmPassword = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        alert('Passwords do not match')
        return
      }

      try {
        const response = await fetch('http://localhost:4000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: { email: email.value, password: password.value }
          })
        })

        if (response.status === 201) {
          const loginResponse = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: { email: email.value, password: password.value }
            })
          })

          if (loginResponse.status === 200) {
            const loginData = await loginResponse.json()
            authStore.login(loginData.session)
            router.push('/')
          } else {
            alert('Registration succeeded, but login failed. Please try to log in manually.')
            router.push('/login')
          }
        } else {
          alert('Registration failed')
        }
      } catch (error) {
        console.error('Error during registration:', error)
        alert('An error occurred. Please try again.')
      }
    }

    return { email, password, confirmPassword, register }
  }
}
</script>
