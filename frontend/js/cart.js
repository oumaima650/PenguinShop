document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsEl = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceEl.textContent = total.toFixed(2);
    }

    function renderCart() {
        cartItemsEl.innerHTML = '';
        cart.forEach((item, index) => {
            const template = document.getElementById('cart-item-template').content.cloneNode(true);
            template.querySelector('.cart-item-name').textContent = item.name;
            template.querySelector('.cart-item-quantity').textContent = item.quantity;
            template.querySelector('.cart-item-price').textContent = `$${(item.price * item.quantity).toFixed(2)}`;

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

            template.querySelector('.remove-item').addEventListener('click', () => {
                cart.splice(index, 1);
                saveCart();
                renderCart();
            });

            cartItemsEl.appendChild(template);
        });
        updateTotal();
    }

    renderCart();

    checkoutBtn.addEventListener('click', () => {
        // This is where we check for authentication ONLY when placing order
        const currentToken = token;

        if (!currentToken) {
            // Redirect to login page if user is not logged in
            const redirectTo = window.location.pathname; // Save current page as redirect
            window.location.href = `login.html?redirect=${encodeURIComponent(redirectTo)}`;
            return;
        }

        if (cart.length === 0) return alert("Cart is empty!");
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Placing Order...';

        const payload = {
            total_price: parseFloat(totalPriceEl.textContent),
            products: cart.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity
            }))
        };

        fetch('http://localhost:8000/api/commandes', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) return res.json().then(err => { throw err; });
                return res.json();
            })
            .then(data => {
                alert('Order placed successfully!');
                localStorage.removeItem('cart');
                window.location.href = 'index.html';
            })
            .catch(err => {
                if (err.message && err.message.includes('Unauthenticated')) {
                    alert('Your session has expired. Please login again.');
                    localStorage.removeItem('auth_token');
                    window.location.href = 'login.html?redirect=cart.html';
                } else {
                    alert('Error placing order: ' + JSON.stringify(err));
                }
            })
            .finally(() => {
                checkoutBtn.disabled = false;
                checkoutBtn.textContent = 'Place Order';
            });
    });

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('cart');
            window.location.href = 'login.html';
        });
    }
});
