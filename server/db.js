const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'ether97',
    host: 'localhost',
    port: 5432,
    database: 'movie_library'
});

module.exports = pool;