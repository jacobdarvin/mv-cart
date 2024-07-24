// src/stores/authStore.js
import { defineStore } from 'pinia'

interface AuthState {
    isAuthenticated: boolean
    token: string | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: false,
        token: null
    }),
    actions: {
        checkAuth() {
            const token = localStorage.getItem('token')
            if (token) {
                this.isAuthenticated = true
                this.token = token
            } else {
                this.isAuthenticated = false
                this.token = null
            }
        },
        login(token: string) {
            localStorage.setItem('token', token)
            this.isAuthenticated = true
            this.token = token
        },
        logout() {
            localStorage.removeItem('token')
            this.isAuthenticated = false
            this.token = null
        }
    }
})
