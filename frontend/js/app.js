document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Fetch products with Authorization header
    fetch('http://localhost:8000/api/products', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');
            const template = document.getElementById('product-template');

            products.forEach(product => {
                const clone = template.content.cloneNode(true);
                clone.querySelector('.product-name').textContent = product.name;
                clone.querySelector('.product-price').textContent = `Price: $${product.price}`;
                clone.querySelector('.product-image').src = product.image || 'https://via.placeholder.com/250';
                productList.appendChild(clone);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            localStorage.removeItem('auth_token');
            window.location.href = 'login.html';
        });
});
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('auth_token');
        window.location.href = 'login.html';
    });
}
