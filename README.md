## la siguiente estructura hace base a como esta estructurado el proyecto

## /Mi-proyecto
    ├── backend/          <-- NUEVA CARPETA
    ├── index.html          (Página de Bienvenida)
    ├── login.html          (Página de Inicio de Sesión y Registro)
    ├── historia.html
    ├── galeria.html
    ├── candidatos.html
    ├── votar.html
    ├── css/
    │   └── estilos.css     (Todos los estilos aquí)
    └── js/
        └── script.js       (Toda la lógica de frontend aquí)
============================================================================================


## paso a paso de como inicializar el proyecto
============================================================================================
# antes de empezar a inicializar el proyecto y descargar dependencias 
# toca asegurar que la base de datos este este creada
# la base de datos se encuentra en la siiguiente ruta
    ├──/sql/database.sql
# primero instalar dependencias
    ├──npm init -y
# despues instalar herramientas con frameworks
    ├──npm install express mysql2 cors
# despues toca entrar a la carpeta de backend para inicializar el proyecto
    ├──node server.js
    
