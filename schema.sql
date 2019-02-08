CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    messages VARCHAR(255)
);