// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { useProductStore } from './productStore'

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
        async checkAuth() {
            const token = localStorage.getItem('token')
            if (token) {
                this.isAuthenticated = true
                this.token = token
            } else {
                this.isAuthenticated = false
                this.token = null
            }
        },
        async fetchBalance() {
            if (!this.token) return
            try {
                const response = await fetch('http://127.0.0.1:4000/api/wallets/balance', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
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
        },
        logout() {
            const productStore = useProductStore()
            productStore.clearCart()
            localStorage.removeItem('token')
            this.isAuthenticated = false
            this.token = null
            this.balance = 0 // Reset balance on logout
        }
    }
})
