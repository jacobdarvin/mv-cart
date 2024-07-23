import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/components/ProductList.vue';
import CartList from '@/components/CartList.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/cart', component: CartList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
