import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useProductStore, type Product } from '@/stores/productStore'

export interface Purchase {
    id: string
    quantity: number
    product_id: string
    user_id: string
    product?: Product  // Add optional product details
}

export const usePurchaseStore = defineStore('purchase', {
    state: () => ({
        purchases: [] as Purchase[],
    }),

    actions: {
        async fetchPurchases() {
            const authStore = useAuthStore();
            const productStore = useProductStore();

            try {
                const response = await fetch(`http://localhost:4000/api/purchases`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authStore.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = await response.json();
                const purchases = result.data;

                for (const purchase of purchases) {
                    const product = await productStore.fetchProduct(purchase.product_id);
                    purchase.product = product;
                }

                this.purchases = purchases;

            } catch (error) {
                console.error('Error fetching purchases: ', error);
            }
        }
    }
});
