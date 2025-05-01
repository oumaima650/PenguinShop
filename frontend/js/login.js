
const urlParams = new URLSearchParams(window.location.search);
const redirectTo = urlParams.get('redirect') || 'index.html'; // Default to 'index.html' if no redirect param

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();


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

            // Redirect user to the page they were trying to access before logging in
            window.location.href = redirectTo;
        } else {
            const error = await response.text();
            alert('Login failed: ' + error);

        }
    });
});

