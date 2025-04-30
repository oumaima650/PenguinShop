document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');

    // Fetch products SANS Auth (accessible à tout le monde)
    fetch('http://localhost:8000/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');
            const template = document.getElementById('product-template');

            products.forEach(product => {
                const clone = template.content.cloneNode(true);
                clone.querySelector('.product-name').textContent = product.name;
                clone.querySelector('.product-price').textContent = `Price: ${product.price}DHs`;
                clone.querySelector('.product-image').src = product.image || 'https://via.placeholder.com/250';

                // Gestion du bouton "Add to Cart"
                const addToCartBtn = clone.querySelector('.add-to-cart-btn');
                addToCartBtn.addEventListener('click', () => {
                    if (!localStorage.getItem('auth_token')) {
                        window.location.href = 'login.html';
                    } else {
                        // Ajoute ton code pour ajouter au panier ici
                        alert('Produit ajouté au panier !');
                    }
                });

                productList.appendChild(clone);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des produits :', error);
        });

    // Gère la déconnexion si bouton visible
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('auth_token');
            window.location.href = 'login.html';
        });
    }
});
