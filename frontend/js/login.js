document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Invalid credentials');
            }

            const token = await response.text();
            localStorage.setItem('auth_token', token);

            // Rediriger vers la page principale
            window.location.href = 'index.html';

        } catch (error) {
            console.error('Login error:', error.message);
            alert('erreur' + error.message);
        }
    });
});

