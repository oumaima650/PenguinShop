document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartCount = document.getElementById('cart-count');
    const productList = document.getElementById('product-list');

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        if (cartCount) cartCount.textContent = cart.length;
    }

    function addToCart(product) {
        const index = cart.findIndex(item => item.product_id === product.id);

        if (index > -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({
                product_id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        saveCart();
        showToast(`${product.name} added to cart 🛒`);
    }

    // Simplified product fetch now that we've fixed the API
    fetch('http://localhost:8000/api/products', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                console.error('Server response:', response.status, response.statusText);
                throw new Error('Failed to fetch products');
            }
            return response.json();
        })
        .then(products => {
            products.forEach(product => {
                const clone = document.getElementById('product-template').content.cloneNode(true);
                clone.querySelector('.product-name').textContent = product.name;
                clone.querySelector('.product-price').textContent = `Price: $${product.price}`;
                clone.querySelector('.product-image').src = product.image || 'https://via.placeholder.com/250';

                clone.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(product));

                productList.appendChild(clone);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);

            // Show detailed error in console for debugging
            console.error('Full error details:', error);

            // Try alternative approach if first attempt failed
            if (token) {
                showToast('Trying alternative method to load products...');

                // If we have a token but still got an error, try without token
                fetch('http://localhost:8000/api/products')
                    .then(response => response.json())
                    .then(products => {
                        products.forEach(product => {
                            const clone = document.getElementById('product-template').content.cloneNode(true);
                            clone.querySelector('.product-name').textContent = product.name;
                            clone.querySelector('.product-price').textContent = `Price: ${product.price}`;
                            clone.querySelector('.product-image').src = product.image || 'https://via.placeholder.com/250';
                            clone.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(product));
                            productList.appendChild(clone);
                        });
                        showToast('Products loaded successfully!');
                    })
                    .catch(fallbackError => {
                        console.error('Fallback error fetching products:', fallbackError);
                        showToast('Error loading products. Please try again later.');
                    });
            } else {
                showToast('Error loading products. Please try again later.');
            }
        });

    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('cart');
            window.location.href = 'login.html';
        });
    }

    // Add login button if user is not authenticated
    const headerActions = document.querySelector('.header-actions') || document.createElement('div');
    if (!token) {
        const loginBtn = document.createElement('button');
        loginBtn.textContent = 'Login';
        loginBtn.classList.add('btn', 'btn-primary', 'ml-2');
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
        headerActions.appendChild(loginBtn);
    }

    updateCartCount();
});
