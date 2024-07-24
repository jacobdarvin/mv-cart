// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

import ProductView from '@/views/ProductView.vue'
import ProductDetail from '@/components/ProductDetail.vue'

import CartView from '@/views/CartView.vue'

const routes = [
  {
    path: '/login', name: 'Login', component: LoginView
  },
  {
    path: '/register', name: 'Register', component: RegisterView
  },
  {
    path: '/', name: 'Products', component: ProductView, meta: { requiresAuth: false }
  },
  {
    path: '/cart', name: 'Cart', component: CartView, meta: { requiresAuth: false }
  },
  {
    path: '/product/:id', name: 'Detail', component: ProductDetail, props: true, meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      if (to.name !== 'Login') {
        return next({ name: 'Login' })
      } else {
        return next()
      }
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default router
