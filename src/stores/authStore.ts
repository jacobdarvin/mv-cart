// src/stores/authStore.js
import { defineStore } from 'pinia'

interface AuthState {
    isAuthenticated: boolean
    token: string | null
    balance: number
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: false,
        token: null,
        balance: 0,
    }),
    actions: {
        checkAuth() {
            const token = localStorage.getItem('token')
            if (token) {
                this.isAuthenticated = true
                this.token = token
                this.fetchBalance() // Fetch balance when checking auth status
            } else {
                this.isAuthenticated = false
                this.token = null
            }
        },
        async fetchBalance() {
            try {
                const response = await fetch('http://localhost:4000/api/balance', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                this.balance = data.balance
            } catch (error) {
                console.error('Failed to fetch balance:', error)
            }
        },
        login(token: string) {
            localStorage.setItem('token', token)
            this.isAuthenticated = true
            this.token = token
            this.fetchBalance() // Fetch balance on login
        },
        logout() {
            localStorage.removeItem('token')
            this.isAuthenticated = false
            this.token = null
            this.balance = 0 // Reset balance on logout
        }
    }
})
