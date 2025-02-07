const axios = require("axios");

const PRICE_API_BASE_URL = "http://localhost:3001/products";

/**
 * Fetch the price of a product from the Price API.
 * @param {string} productName - The name of the product.
 * @returns {Promise<number>} - The price of the product.
 */
async function getProductPrice(productName) {
    try {
        const response = await axios.get(`${PRICE_API_BASE_URL}/${productName}`);
        return response.data.price;
    } catch (error) {
        throw new Error(`Failed to fetch price for ${productName}`);
    }
}

module.exports = { getProductPrice };
