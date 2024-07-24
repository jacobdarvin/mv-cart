// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/components/ProductList.vue'
import CartList from '@/components/CartList.vue'
import ProductDetail from '@/components/ProductDetail.vue'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/login', name: 'Login', component: LoginView
  },
  {
    path: '/register', name: 'Register', component: RegisterView
  },
  {
    path: '/', component: ProductList, meta: { requiresAuth: true }
  },
  {
    path: '/cart', component: CartList, meta: { requiresAuth: true }
  },
  {
    path: '/product/:id', component: ProductDetail, props: true, meta: { requiresAuth: true }
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
