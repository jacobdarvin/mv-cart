import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";

interface Purchase {
    id: string;
    quantity: number;
    product_id: string;
    user_id: string;
}

export const usePurchaseStore = defineStore('purchase', {
    state: () => ({
        purchases: [] as Purchase[],
    }),

    actions: {
        async fetchPurchases() {
            const authStore = useAuthStore();
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

                // Update the state with the fetched purchases
                this.purchases = result.data;

            } catch (error) {
                console.error('Error fetching purchases: ', error);
            }
        }
    }
});
