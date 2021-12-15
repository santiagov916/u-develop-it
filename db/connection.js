const mysql = require('mysql2');

// CONNECT TO MYSQL DATABASE 
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MYSQL username,
        user: 'root',
        // YOUR MYSQL password
        password: 'hellafarted',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;