async function login(email, password) {
    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const token = await response.text();
        localStorage.setItem('auth_token', token);
        return true; // Indique succès
    } catch (error) {
        console.error('Login error:', error.message);
        return false; // Indique échec
    }
}

async function getUser() {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error('No token found');

        const response = await fetch('http://localhost:8000/api/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) throw new Error('Unauthorized');

        const userData = await response.json();
        console.log(userData);
        return userData;
    } catch (error) {
        console.error('Get user error:', error.message);
        return null;
    }
}

async function logout() {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) return;

        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        localStorage.removeItem('auth_token');
    } catch (error) {
        console.error('Logout error:', error.message);
    }
}

