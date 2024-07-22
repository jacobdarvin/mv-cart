import { defineStore } from "pinia";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number
}

export interface CartItem extends Product {
    quantity: number;
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        products: [] as Product[],
        cart: [] as CartItem[]
    }),
    actions: {
        async fetchProduct() {
            // API Call
        },
        addToCart(product: Product) {
            const cartItem = this.cart.find(item => item.id === product.id);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                this.cart.push({ ...product, quantity: 1 })
            }
        },
        confirmPurchase() {
            //TODO: API Call
        },
    },
    getters: {
        cartTotal: state => {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
        },
    },
});