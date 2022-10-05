CREATE DATABASE library;

CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(10)
);