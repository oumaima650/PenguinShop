async function login(email, password) {
    const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const token = await response.text();
    localStorage.setItem('auth_token', token);
}



async function getUser() {
    const token = localStorage.getItem('auth_token');

    const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const userData = await response.json();
    console.log(userData);
}
async function logout() {
    const token = localStorage.getItem('auth_token');

    await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    localStorage.removeItem('auth_token');
}
