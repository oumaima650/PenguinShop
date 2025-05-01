document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');


    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, phone, email, password })
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

