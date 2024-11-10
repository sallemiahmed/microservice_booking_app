CREATE DATABASE IF NOT EXISTS users_db;
USE users_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Only insert data if the table is empty
INSERT INTO users (name, email)
SELECT 'Ahmed', 'ahmed@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'ahmed@example.com');

INSERT INTO users (name, email)
SELECT 'Narjes', 'narjes@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'narjes@example.com');
