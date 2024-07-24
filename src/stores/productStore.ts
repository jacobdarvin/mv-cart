import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

interface Product {
    id: string
    name: string
    description: string
    price: number
    quantity: number
    image: string
}

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[],
        cart: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
    }),
    actions: {
        async fetchProducts() {
            const authStore = useAuthStore()

            try {
                const response = await fetch('http://localhost:4000/api/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`)
                }

                const data = await response.json()
                this.products = data.data.map((product: any) => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: parseFloat(product.price),
                    quantity: product.quantity,
                    image: product.image
                }))

                console.log(this.products)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        },
        async fetchProduct(productId: string) {
            const authStore = useAuthStore()

            try {
                const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authStore.token}`
                    }
                })

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`)
                }

                const result = await response.json()
                return {
                    id: result.data.id,
                    name: result.data.name,
                    description: result.data.description,
                    price: parseFloat(result.data.price),
                    quantity: result.data.quantity
                }
            } catch (error) {
                console.error('Error fetching product:', error)
                return null
            }
        },
        addToCart(product: Product, quantity: number) {
            const item = this.cart.find(item => item.id === product.id)
            if (item) {
                item.quantity += quantity
            } else {
                this.cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image: product.image
                })
            }
            this.saveCart()
        },
        removeFromCart(productId: string) {
            const item = this.cart.find(item => item.id === productId)
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1
                } else {
                    this.cart = this.cart.filter(item => item.id !== productId)
                }
                this.saveCart()
            }
        },
        clearCart() {
            this.cart = []
            this.saveCart()
        },
        saveCart() {
            console.log('saving cart!')
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    },
    getters: {
        totalItemsInCart: (state) => {
            return state.cart.reduce((total, item) => total + item.quantity, 0)
        }
    }
})
