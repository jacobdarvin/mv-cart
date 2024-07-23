import { defineStore } from 'pinia'

export interface Product {
    id: number
    name: string
    description: string
    price: number
    quantity: number
}

export interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
}

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[],
        cart: [] as CartItem[],
    }),
    actions: {
        async fetchProducts() {
            const response = await fetch('http://localhost:4000/api/products')
            const data = await response.json()
            this.products = data.data

            console.log(this.products)
        },
        addToCart(product: Product) {
            const item = this.cart.find(item => item.id === product.id)
            if (item) {
                item.quantity++
            } else {
                this.cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
            }
        },
        removeFromCart(productId: number) {
            this.cart = this.cart.filter(item => item.id !== productId)
        },
        clearCart() {
            this.cart = []
        }
    }
})