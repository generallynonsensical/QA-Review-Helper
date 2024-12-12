const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3001;

// Database file path
const dbPath = path.join(__dirname, '..', 'db', 'audit_questions.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Enable CORS for all routes
app.use(cors());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Endpoint to fetch questions
app.get('/questions/:mainIndex', (req, res) => {
    const mainIndex = req.params.mainIndex;
    db.all(`SELECT "#" as number, question FROM audit_questions WHERE "#" LIKE ?`, [`${mainIndex}.%`], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});