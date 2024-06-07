-- Crear base de datos
CREATE DATABASE ozin;

-- Conectar a la base de datos creada
\c tienda_ropa;

-- Crear tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de categorías
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Crear tabla de productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    stock INT NOT NULL CHECK (stock >= 0),
    category_id INT REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de pedidos
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    status VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de detalles de pedidos
CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de historial de estado de pedidos (opcional)
CREATE TABLE order_status_history (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    status VARCHAR(50) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_product_name ON products(name);
CREATE INDEX idx_order_user ON orders(user_id);

-- Insertar un usuario administrador de ejemplo
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@tienda.com', 'adminpassword', 'admin');

-- Insertar algunos usuarios de ejemplo
INSERT INTO users (username, email, password, role) VALUES
('user1', 'user1@tienda.com', 'userpassword', 'user'),
('user2', 'user2@tienda.com', 'user2password', 'user');

-- Insertar algunas categorías de ejemplo
INSERT INTO categories (name, description) VALUES
('Camisas', 'Variedad de camisas'),
('Pantalones', 'Variedad de pantalones'),
('Zapatos', 'Variedad de zapatos');

-- Insertar algunos productos de ejemplo
INSERT INTO products (name, description, price, stock, category_id) VALUES
('Camisa Roja', 'Camisa de algodón roja', 19.99, 100, 1),
('Pantalón Jeans', 'Pantalón de mezclilla', 49.99, 200, 2),
('Zapatos Deportivos', 'Zapatos deportivos cómodos', 79.99, 150, 3);
