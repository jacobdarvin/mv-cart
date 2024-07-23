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
        cart: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
    }),
    actions: {
        async fetchProducts() {
            const response = await fetch('http://localhost:4000/api/products')
            const data = await response.json()
            this.products = data.data.map((product: any) => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: parseFloat(product.price),
                quantity: product.quantity
            }))

            console.log(this.products)
        },
        addToCart(product: Product) {
            const item = this.cart.find(item => item.id === product.id)
            if (item) {
                item.quantity++
            } else {
                this.cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
            }
            this.saveCart()
        },
        removeFromCart(productId: number) {
            this.cart = this.cart.filter(item => item.id !== productId)
            this.saveCart()
        },
        clearCart() {
            this.cart = []
            this.saveCart()
        },
        saveCart() {
            console.log('saving cart!')
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    }
})
