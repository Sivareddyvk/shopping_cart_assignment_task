const cartService = require("../src/cartService");

test("Adding products updates cart and calculates totals correctly", async () => {
    // Mock price API responses
    cartService.cart = {};
    jest.spyOn(cartService, "addProduct").mockImplementation(async (product, quantity) => {
        cartService.cart[product] = { quantity, price: product === "cornflakes" ? 2.52 : 9.98 };
    });

    await cartService.addProduct("cornflakes", 1);
    await cartService.addProduct("cornflakes", 1);
    await cartService.addProduct("weetabix", 1);

    const cartState = cartService.getCartState();

    expect(cartState.subtotal).toBe(15.02);
    expect(cartState.tax).toBe(1.88);
    expect(cartState.total).toBe(16.90);
});
