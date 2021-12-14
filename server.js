const express = require('express');
const { result } = require('lodash');
const mysql = require('mysql2');
const inputCheck = require('./db/utils/inputCheck');

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

// GET all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// DELETE a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// CREATE a candidate
app.post('/api/candidate', ({ body }, res) => {

    // ERROR input check to avoid erroneous inputs
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
        }
    
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(40000).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
    
    });

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});