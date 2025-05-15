document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return (window.location.href = 'login.html');

    const ordersList = document.getElementById('orders-list');

    fetch('http://localhost:8000/api/my-commandes', {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) {
                if (res.status === 401) {
                    localStorage.clear();
                    window.location.href = 'login.html';
                }
                throw new Error('Failed to fetch commandes');
            }
            return res.json();
        })
        .then(commandes => {
            console.log(commandes);
            if (!commandes.length) {
                ordersList.textContent = 'No commandes found.';
                return;
            }

            commandes.forEach(cmd => {
                const div = document.createElement('div');
                div.classList.add('order-card');


                let productList = '';
                    cmd.products.forEach(p => {
                        productList += `
                    <li>${p.name} - Quantity: ${p.pivot.quantity}, Unit Price: ${p.pivot.price} Dhs</li>
                    `;
                    });

                    div.innerHTML = `
<!--                    <p><strong>Commande ID:</strong> ${cmd.id}</p>-->
                    <p><strong>Status:</strong> ${cmd.status}</p>
                    <p><strong>Total:</strong> ${cmd.total_price} DHs </p>
                    <p><strong>Date:</strong> ${new Date(cmd.created_at).toLocaleString()}</p>
                    <p><strong>Products:</strong></p>
                    <ul>${productList}</ul>
                    `;


                ordersList.appendChild(div);
            });
        })
        .catch(err => {
            console.error('Error loading commandes:', err);
            ordersList.textContent = 'Failed to load orders.';
        });

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'login.html';
    });
});
