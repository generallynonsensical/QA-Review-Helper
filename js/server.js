const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

const db = new sqlite3.Database('./db/data.db');

app.get('/questions/:mainIndex', (req, res) => {
    const mainIndex = req.params.mainIndex;
    db.all(`SELECT question, guidelines FROM questions WHERE mainIndex LIKE ?`, [`${mainIndex}%`], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});