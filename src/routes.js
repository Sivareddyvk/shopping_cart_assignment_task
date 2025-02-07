const express = require("express");
const cartService = require("./cartService");

const router = express.Router();

/**
 * Add product to the cart.
 */
router.post("/cart/add", async (req, res) => {
    const { product, quantity } = req.body;

    if (!product || !quantity) {
        return res.status(400).json({ error: "Product name and quantity are required" });
    }

    try {
        await cartService.addProduct(product, quantity);
        res.json({ message: "Product added", cart: cartService.getCartState() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get the cart state.
 */
router.get("/cart", (req, res) => {
    res.json(cartService.getCartState());
});

module.exports = router;
