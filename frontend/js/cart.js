// document.addEventListener('DOMContentLoaded', () => {
//     const token = localStorage.getItem('auth_token');
//
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartItemsEl = document.getElementById('cart-items');
//     const totalPriceEl = document.getElementById('total-price');
//     const checkoutBtn = document.getElementById('checkout-btn');
//
//     function saveCart() {
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }
//
//     function updateTotal() {
//         const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         totalPriceEl.textContent = total.toFixed(2);
//     }
//
//     function renderCart() {
//         cartItemsEl.innerHTML = '';
//         cart.forEach((item, index) => {
//             const template = document.getElementById('cart-item-template').content.cloneNode(true);
//             template.querySelector('.cart-item-name').textContent = item.name;
//             template.querySelector('.cart-item-quantity').textContent = item.quantity;
//             template.querySelector('.cart-item-price').textContent = `${(item.price * item.quantity).toFixed(2)}`;
//
//             template.querySelector('.increase-qty').addEventListener('click', () => {
//                 item.quantity++;
//                 saveCart();
//                 renderCart();
//             });
//
//             template.querySelector('.decrease-qty').addEventListener('click', () => {
//                 if (item.quantity > 1) {
//                     item.quantity--;
//                     saveCart();
//                     renderCart();
//                 }
//             });
//
//             template.querySelector('.remove-item').addEventListener('click', () => {
//                 cart.splice(index, 1);
//                 saveCart();
//                 renderCart();
//             });
//
//             cartItemsEl.appendChild(template);
//         });
//         updateTotal();
//     }
//
//     renderCart();
//
//     checkoutBtn.addEventListener('click', () => {
//
//         const currentToken = token;
//
//         if (!currentToken) {
//
//             const redirectTo = window.location.pathname;
//             window.location.href = `login.html?redirect=${encodeURIComponent(redirectTo)}`;
//             return;
//         }
//
//         if (cart.length === 0) return alert("Cart is empty!");
//         checkoutBtn.disabled = true;
//         checkoutBtn.textContent = 'Placing Order...';
//
//         const payload = {
//             total_price: parseFloat(totalPriceEl.textContent),
//             products: cart.map(item => ({
//                 product_id: item.product_id,
//                 quantity: item.quantity
//             }))
//         };
//
//         fetch('http://localhost:8000/api/commandes', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Bearer ' + token,
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify(payload)
//         })
//             .then(res => {
//                 if (!res.ok) return res.json().then(err => { throw err; });
//                 return res.json();
//             })
//             .then(data => {
//                 alert('Order placed successfully!');
//                 localStorage.removeItem('cart');
//                 window.location.href = 'track-order.html';
//             })
//             .catch(err => {
//                 if (err.message && err.message.includes('Unauthenticated')) {
//                     alert('Your session has expired. Please login again.');
//                     localStorage.removeItem('auth_token');
//                     window.location.href = 'login.html?redirect=cart.html';
//                 } else {
//                     alert('Error placing order: ' + JSON.stringify(err));
//                 }
//             })
//             .finally(() => {
//                 checkoutBtn.disabled = false;
//                 checkoutBtn.textContent = 'Place Order';
//             });
//     });
//
//     const logoutBtn = document.getElementById('logout-btn');
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', () => {
//             localStorage.removeItem('auth_token');
//             localStorage.removeItem('cart');
//             window.location.href = 'login.html';
//         });
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsEl = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.querySelector('.clear-cart');
    const cartCount = document.getElementById('cart-count');

    // Cart counter update function
    const updateCartCounter = () => {
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
    };

    const updateTotal = () => {
        const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingCost = cart.length > 0 ? 5 : 0; // Only add shipping if cart has items
        totalPriceEl.textContent = (cartTotal + shippingCost).toFixed(2);
    };

    // Enhanced clear cart functionality
    const clearCart = () => {
        if (cart.length === 0) return;

        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            localStorage.removeItem('cart');
            renderCart();
            updateCartCounter();
        }
    };

    const renderCart = () => {
        cartItemsEl.innerHTML = cart.length ? '' : `
            <div class="empty-cart">
                <img src="images/empty_cart.png" alt="Empty cart">
                <p>Your cart is feeling lonely!</p>
                <a href="index.html#products" class="cta-button">Continue Shopping</a>
            </div>`;

        if (cart.length === 0) return;

        // Create an array of promises for fetching product details
        const fetchPromises = cart.map(item =>
            fetch(`http://localhost:8000/api/products/${item.product_id}`)
                .then(response => response.json())
                .catch(error => {
                    console.error('Error fetching product:', error);
                    return null;
                })
        );

        // Wait for all product details to be fetched
        Promise.all(fetchPromises)
            .then(products => {
                cart.forEach((item, index) => {
                    const template = document.getElementById('cart-item-template').content.cloneNode(true);
                    const itemTotal = (item.price * item.quantity).toFixed(2);
                    const product = products[index]; // Get the fetched product details

                    template.querySelector('.cart-item-name').textContent = item.name;
                    template.querySelector('.cart-item-quantity').textContent = item.quantity;
                    template.querySelector('.cart-item-price').textContent = `${itemTotal} DHs`;

                    // Use the image from the API response
                    const imageElement = template.querySelector('.cart-item-image');
                    if (product && product.image) {
                        imageElement.src = product.image;
                    } else {
                        imageElement.src = 'https://via.placeholder.com/100';
                    }

                    // Add error handler for image loading
                    imageElement.onerror = function() {
                        console.log('Image failed to load:', product?.image);
                        this.src = 'https://via.placeholder.com/100';
                    };

                    // Quantity controls
                    template.querySelector('.increase-qty').addEventListener('click', () => {
                        item.quantity++;
                        saveCart();
                        renderCart();
                    });

                    template.querySelector('.decrease-qty').addEventListener('click', () => {
                        if (item.quantity > 1) {
                            item.quantity--;
                            saveCart();
                            renderCart();
                        }
                    });

                    // Remove item functionality
                    template.querySelector('.remove-item').addEventListener('click', () => {
                        cart.splice(index, 1);
                        saveCart();
                        renderCart();
                    });

                    cartItemsEl.appendChild(template);
                });

                updateTotal();
            })
            .catch(error => {
                console.error('Error rendering cart:', error);
            });
    };

    // Event listeners
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    checkoutBtn.addEventListener('click', async () => {
        const currentToken = token;
        if (!currentToken) {
            const redirectTo = window.location.pathname;
            window.location.href = `login.html?redirect=${encodeURIComponent(redirectTo)}`;
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        try {
            checkoutBtn.disabled = true;
            checkoutBtn.textContent = 'Processing...';

            // Ensure total_price is a valid number
            let totalPrice = parseFloat(totalPriceEl.textContent);
            if (isNaN(totalPrice)) totalPrice = 0;

            const payload = {
                total_price: totalPrice,
                products: cart.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity
                }))
            };

            const response = await fetch('http://localhost:8000/api/commandes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw await response.json();

            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            window.location.href = 'track-order.html';
        } catch (error) {
            const message = error?.message?.includes('Unauthenticated')
                ? 'Session expired. Please login again.'
                : `Order failed: ${error.message || JSON.stringify(error)}`;

            alert(message);

            if (message.includes('Unauthenticated')) {
                localStorage.removeItem('auth_token');
                window.location.href = 'login.html?redirect=cart.html';
            }
        } finally {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Place Order';
        }
    });

    // Logout handler
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('cart');
        window.location.href = 'login.html';
    });

    // Initial setup
    renderCart();
    updateCartCounter();
});
