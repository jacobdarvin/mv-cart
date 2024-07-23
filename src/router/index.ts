import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/components/ProductList.vue'
import CartList from '@/components/CartList.vue'
import ProductDetail from '@/components/ProductDetail.vue'

const routes = [
  { path: '/', component: ProductList },
  { path: '/cart', component: CartList },
  { path: '/product/:id', component: ProductDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
