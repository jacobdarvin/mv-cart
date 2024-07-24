// src/stores/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false
    }),
    actions: {
        checkAuth() {
            const session = localStorage.getItem('session')
            if (session) {
                this.isAuthenticated = true
            } else {
                this.isAuthenticated = false
            }
        },
        login(sessionData) {
            localStorage.setItem('session', JSON.stringify(sessionData))
            this.isAuthenticated = true
        },
        logout() {
            localStorage.removeItem('session')
            this.isAuthenticated = false
        }
    }
})
