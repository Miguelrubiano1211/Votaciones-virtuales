document.addEventListener('DOMContentLoaded', function() {
    
    // Lógica para alternar formularios de login y registro
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    // --- LÓGICA DEL BACKEND (CONCEPTUAL) ---
    // Aquí es donde harías las llamadas al servidor (backend)
    // Ejemplo: al enviar el formulario de registro
    
    // const registerFormElement = registerForm.querySelector('form');
    // registerFormElement.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     const name = document.getElementById('register-name').value;
    //     const email = document.getElementById('register-email').value;
    //     const password = document.getElementById('register-password').value;
    //
    //     // Usarías 'fetch' para enviar estos datos a tu backend
    //     fetch('http://localhost:3000/api/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ name, email, password }),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data); // "Usuario registrado con éxito"
    //         alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    //         window.location.href = 'login.html'; // Redirige al login
    //     })
    //     .catch(error => console.error('Error:', error));
    // });
});




document.addEventListener('DOMContentLoaded', function() {

    // ... (el código para alternar formularios que ya tenías)
    
    const registerFormElement = document.querySelector('#register-form form');

    if (registerFormElement) {
        registerFormElement.addEventListener('submit', async function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // 1. Capturamos los datos del formulario
            const nombre_completo = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            // 2. Usamos 'fetch' para enviar los datos a nuestra API en el backend
            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST', // El método debe coincidir con el del backend (app.post)
                    headers: {
                        'Content-Type': 'application/json', // Le decimos al backend que estamos enviando JSON
                    },
                    body: JSON.stringify({ nombre_completo, email, password }), // Convertimos nuestro objeto JS a una cadena JSON
                });

                const result = await response.json(); // Leemos la respuesta del servidor

                if (response.ok) { // Si la respuesta fue exitosa (status 200-299)
                    alert(result.message); // Muestra "Usuario registrado con éxito."
                    window.location.reload(); // Recarga la página para mostrar el formulario de login
                } else {
                    // Si el servidor devolvió un error (status 400, 500, etc.)
                    alert('Error: ' + result.message);
                }

            } catch (error) {
                console.error('Error de conexión:', error);
                alert('No se pudo conectar con el servidor. Revisa la consola.');
            }
        });
    }
});