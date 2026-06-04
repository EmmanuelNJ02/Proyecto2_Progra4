DROP DATABASE IF EXISTS bolsa_empleo;
CREATE DATABASE bolsa_empleo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bolsa_empleo;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL,
    rol ENUM('ADMIN', 'EMPRESA', 'OFERENTE') NOT NULL,
    estado ENUM('PENDIENTE', 'APROBADO', 'RECHAZADO') NOT NULL DEFAULT 'PENDIENTE',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE administrador (
    usuario_id INT PRIMARY KEY,
    nombre_admin VARCHAR(150) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE empresa (
    usuario_id INT PRIMARY KEY,
    nombre_empresa VARCHAR(150) NOT NULL,
    localizacion TEXT NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE oferente (
    usuario_id INT PRIMARY KEY,
    identificacion VARCHAR(50) NOT NULL UNIQUE,
    nombre_oferente VARCHAR(100) NOT NULL,
    primer_apellido VARCHAR(100) NOT NULL,
    segundo_apellido VARCHAR(100),
    nacionalidad VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    lugar_residencia TEXT NOT NULL,
    ruta_curriculum VARCHAR(500),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE caracteristica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_caracteristica VARCHAR(100) NOT NULL,
    caracteristica_padre_id INT NULL,
    FOREIGN KEY (caracteristica_padre_id) REFERENCES caracteristica(id) ON DELETE CASCADE
);

CREATE TABLE puesto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    descripcion_general TEXT NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    tipo_publicacion ENUM('PUBLICO', 'PRIVADO') NOT NULL DEFAULT 'PUBLICO',
    activo BOOLEAN DEFAULT TRUE,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empresa_id) REFERENCES empresa(usuario_id) ON DELETE CASCADE
);

CREATE TABLE puesto_caracteristica (
    puesto_id INT NOT NULL,
    caracteristica_id INT NOT NULL,
    nivel_deseado TINYINT NOT NULL,
    PRIMARY KEY (puesto_id, caracteristica_id),
    FOREIGN KEY (puesto_id) REFERENCES puesto(id) ON DELETE CASCADE,
    FOREIGN KEY (caracteristica_id) REFERENCES caracteristica(id) ON DELETE CASCADE
);

CREATE TABLE oferente_habilidad (
    oferente_id INT NOT NULL,
    caracteristica_id INT NOT NULL,
    nivel TINYINT NOT NULL,
    PRIMARY KEY (oferente_id, caracteristica_id),
    FOREIGN KEY (oferente_id) REFERENCES oferente(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (caracteristica_id) REFERENCES caracteristica(id) ON DELETE CASCADE
);

INSERT INTO usuario (correo_electronico, clave, rol, estado) VALUES
('admin@bolsaempleo.com', 'admin123', 'ADMIN', 'APROBADO'),
('empresa.demo@bolsaempleo.com', 'demo123', 'EMPRESA', 'APROBADO'),
('oferente.demo@bolsaempleo.com', 'demo123', 'OFERENTE', 'APROBADO'),
('empresa.pendiente@bolsaempleo.com', 'demo123', 'EMPRESA', 'PENDIENTE'),
('oferente.pendiente@bolsaempleo.com', 'demo123', 'OFERENTE', 'PENDIENTE');

INSERT INTO administrador (usuario_id, nombre_admin) VALUES (1, 'Administrador General');

INSERT INTO empresa (usuario_id, nombre_empresa, localizacion, correo_electronico, telefono, descripcion) VALUES
(2, 'SoftLab', 'San José, Costa Rica', 'empresa.demo@bolsaempleo.com', '2222-3333', 'Empresa dedicada al desarrollo de software.'),
(4, 'Data Solutions', 'Heredia, Costa Rica', 'empresa.pendiente@bolsaempleo.com', '2444-1111', 'Empresa pendiente de aprobación.');

INSERT INTO oferente (usuario_id, identificacion, nombre_oferente, primer_apellido, segundo_apellido, nacionalidad, telefono, lugar_residencia, ruta_curriculum) VALUES
(3, '1-1111-1111', 'Ana', 'Sánchez', 'Rojas', 'Costarricense', '8888-9999', 'Heredia, Costa Rica', '/uploads/cv/cv_3.pdf'),
(5, '2-2222-2222', 'Carlos', 'Mora', 'Vargas', 'Costarricense', '8777-6666', 'Alajuela, Costa Rica', '/uploads/cv/cv_5.pdf');

INSERT INTO caracteristica (nombre_caracteristica, caracteristica_padre_id) VALUES
('Lenguajes de programación', NULL),
('Tecnologías Web', NULL),
('Testing', NULL),
('Bases de Datos', NULL),
('Java', 1),
('C#', 1),
('Python', 1),
('HTML', 2),
('CSS', 2),
('JavaScript', 2),
('React', 2),
('Thymeleaf', 2),
('JUnit', 3),
('Casos de prueba', 3),
('MySQL', 4),
('PostgreSQL', 4);

INSERT INTO oferente_habilidad (oferente_id, caracteristica_id, nivel) VALUES
(3, 5, 4),
(3, 8, 5),
(3, 9, 4),
(3, 10, 3),
(3, 15, 4),
(5, 5, 5),
(5, 10, 5),
(5, 11, 4),
(5, 15, 5),
(5, 16, 4);

INSERT INTO puesto (empresa_id, descripcion_general, salario, tipo_publicacion, activo, fecha_publicacion) VALUES
(2, 'Full Stack Developer', 2000.00, 'PUBLICO', TRUE, NOW()),
(2, 'Frontend Developer', 1200.00, 'PUBLICO', TRUE, NOW() - INTERVAL 1 DAY),
(2, 'Backend software developer', 1500.00, 'PUBLICO', TRUE, NOW() - INTERVAL 2 DAY),
(2, 'Unity game developer', 1300.00, 'PUBLICO', TRUE, NOW() - INTERVAL 3 DAY),
(2, 'Administrador de bases de datos', 1800.00, 'PRIVADO', TRUE, NOW() - INTERVAL 4 DAY);

INSERT INTO puesto_caracteristica (puesto_id, caracteristica_id, nivel_deseado) VALUES
(1, 5, 4), (1, 10, 4), (1, 11, 3), (1, 15, 4),
(2, 8, 4), (2, 9, 4), (2, 10, 4), (2, 11, 3),
(3, 5, 4), (3, 15, 4),
(4, 7, 3),
(5, 15, 5), (5, 16, 4);
