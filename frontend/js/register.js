document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                alert('Registration successful! Please log in.');
                window.location.href = 'login.html';
            } else {
                const errorData = await response.json();
                alert('Registration failed: ' + (errorData.message || 'Please try again.'));
            }
        } catch (error) {
            console.error('Register error:', error);
            alert('Something went wrong. Please try again later.');
        }
    });
});

