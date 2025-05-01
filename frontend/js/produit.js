
document.addEventListener('DOMContentLoaded', () => {
    // Récupère l'ID du produit depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const descriptions = {
        1: "A set of two elegant mugs, perfect for sharing coffee or tea together.",
        2: "A bright yellow mug that brings cheerfulness to every coffee break.",
        3: "A soft and modern blue mug, ideal for enjoying your favorite hot drinks.",
        4: "A refined dark blue mug, for a touch of sophistication at your table.",
        5: "A vibrant pink mug that brightens your days with a splash of color.",
        6: "An elegant grey mug, for a timeless and modern style.",
        7: "A classic white mug, ideal for any occasion.",
        8: "A ceramic mug with a unique design, perfect for coffee lovers.",
        9: "A set of two cute mugs, perfect for sharing coffee or tea with your frind.",
        10: "A soothing green mug, perfect for relaxing with a cup of tea.",
    };

    if (!productId) {
        document.getElementById('product-detail-container').textContent = "Produit introuvable.";
        return;
    }

    fetch(`http://localhost:8000/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const template = document.getElementById('product-detail-template');
            const container = document.getElementById('product-detail-container');
            const clone = template.content.cloneNode(true);

            clone.querySelector('.product-detail-image').src = product.image || 'https://via.placeholder.com/420';
            clone.querySelector('.product-detail-name').textContent = product.name || 'Produit';
            clone.querySelector('.product-detail-price').textContent = product.price ? `${product.price} DHs` : '';
            clone.querySelector('.product-detail-description').textContent = descriptions[product.id] || 'Aucune description.';

            // Gestion du bouton "Ajouter au panier"
            clone.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
                localStorage.setItem('cart', JSON.stringify(cart));
                showToast(`${product.name} added to cart 🛒`);
            });

            container.appendChild(clone);
        })
        .catch(() => {
            document.getElementById('product-detail-container').textContent = "Erreur lors du chargement du produit.";
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

});