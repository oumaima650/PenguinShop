document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const token = await response.text();
            localStorage.setItem('auth_token', token);

            window.location.href = 'index.html';
        } else {
            const error = await response.text();
            alert('Login failed: ' + error);
        }
    } catch (error) {
        alert('Network error: ' + error.message);
    }
});
