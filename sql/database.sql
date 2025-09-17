CREATE DATABASE votaciones_db;
USE votaciones_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('votante', 'administrador') NOT NULL DEFAULT 'votante',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    foto_url VARCHAR(255),
    propuestas TEXT NOT NULL
);

CREATE TABLE votos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    candidato_id INT NOT NULL,
    fecha_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (candidato_id) REFERENCES candidatos(id),
    UNIQUE(usuario_id)
);

CREATE TABLE galeria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagen_url VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);