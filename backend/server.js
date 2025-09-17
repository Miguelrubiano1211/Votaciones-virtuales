// 1. IMPORTAR LAS LIBRERÍAS (HERRAMIENTAS)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// 2. CONFIGURACIÓN INICIAL
const app = express(); // Crear la aplicación de Express
const PORT = 3000; // El puerto donde correrá nuestro servidor

// 3. MIDDLEWARES - Funciones que se ejecutan antes que nuestras rutas
app.use(cors()); // Permite las solicitudes de otros orígenes (nuestro frontend)
app.use(express.json()); // Permite al servidor entender datos en formato JSON enviados desde el frontend

// 4. CONEXIÓN A LA BASE DE DATOS MYSQL
// Concepto: Un "pool" de conexiones es más eficiente que una única conexión.
// Gestiona múltiples conexiones a la vez y las reutiliza, lo que mejora el rendimiento.
const db = mysql.createPool({
    host: 'localhost',      // La dirección de tu servidor MySQL (usualmente 'localhost')
    user: 'root',           // Tu usuario de MySQL (usualmente 'root')
    password: '',           // Tu contraseña de MySQL (déjala vacía si no tienes)
    database: 'votaciones_db' // ¡IMPORTANTE! El nombre de tu base de datos
}).promise(); // Usamos .promise() para poder usar async/await, una forma más moderna de manejar código asíncrono.

// --- 5. DEFINICIÓN DE LAS RUTAS (NUESTRA API) ---

// EJEMPLO 1: Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
    // req (request) = La petición que llega del frontend
    // res (response) = La respuesta que enviaremos de vuelta
    
    try {
        // Obtenemos los datos que el usuario envió en el formulario de registro
        const { nombre_completo, email, password } = req.body;

        // Validamos que los datos no estén vacíos
        if (!nombre_completo || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // ¡IMPORTANTE! NUNCA guardes contraseñas en texto plano.
        // Aquí deberías usar una librería como 'bcrypt' para encriptar la contraseña.
        // Por simplicidad del ejemplo, la guardamos directamente, pero esto es inseguro.
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos la consulta SQL para insertar el nuevo usuario
        // Usamos '?' para prevenir ataques de inyección SQL. Los valores se pasan en el segundo argumento.
        const sql = 'INSERT INTO usuarios (nombre_completo, email, password) VALUES (?, ?, ?)';
        
        // Ejecutamos la consulta en la base de datos
        await db.query(sql, [nombre_completo, email, password]); // Reemplaza 'password' con 'hashedPassword' en un proyecto real

        // Enviamos una respuesta exitosa al frontend
        res.status(201).json({ message: 'Usuario registrado con éxito.' });

    } catch (error) {
        // Si ocurre un error (ej: el email ya existe), lo capturamos
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor. Inténtalo más tarde.' });
    }
});

// EJEMPLO 2: Ruta para obtener todos los candidatos
app.get('/api/candidatos', async (req, res) => {
    try {
        const sql = 'SELECT id, nombre, foto_url, propuestas FROM candidatos';
        const [candidatos] = await db.query(sql); // db.query devuelve un array [results, fields]

        // Enviamos la lista de candidatos al frontend
        res.status(200).json(candidatos);

    } catch (error) {
        console.error('Error al obtener candidatos:', error);
        res.status(500).json({ message: 'Error al cargar los candidatos.' });
    }
});

// Aquí irían las otras rutas que necesitas:
// app.post('/api/login', ...)         -> Para iniciar sesión
// app.post('/api/vote', ...)          -> Para registrar un voto
// app.get('/api/gallery', ...)        -> Para obtener las fotos de la galería
// app.post('/api/gallery/upload', ...) -> Para subir una foto (requiere configuración extra para archivos)


// 6. INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});