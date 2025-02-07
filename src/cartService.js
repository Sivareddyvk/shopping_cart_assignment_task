const priceService = require("./priceService");

class CartService {
    constructor() {
        this.cart = {}; // { "productName": { quantity, price } }
    }

    async addProduct(productName, quantity) {
        if (!this.cart[productName]) {
            const price = await priceService.getProductPrice(productName);
            this.cart[productName] = { quantity, price };
        } else {
            this.cart[productName].quantity += quantity;
        }
    }

    getCartState() {
        let subtotal = 0;

        for (const product in this.cart) {
            const { quantity, price } = this.cart[product];
            subtotal += quantity * price;
        }

        const tax = parseFloat((subtotal * 0.125).toFixed(2));
        const total = parseFloat((subtotal + tax).toFixed(2));

        return { cart: this.cart, subtotal, tax, total };
    }
}

module.exports = new CartService();
