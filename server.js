const express = require('express');
const { result } = require('lodash');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

const app = express();

// EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

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

db.query(`SELECT * FROM candidates WHERE id = 0`, (err, rows) => {
    if (err) {
        console.log(err);
    }
    console.log(rows);
});

// DELETE a candidate
db.query(`DELETE FROM candidates WHERE id = ?`, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

// CREATE a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?,?,?,?)`;

const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});