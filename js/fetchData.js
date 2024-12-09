const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

function fetchQuestions(mainIndex, callback) {
    db.all(`SELECT question, guidelines FROM questions WHERE mainIndex = ?`, [mainIndex], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback([]);
        } else {
            callback(rows);
        }
    });
}

module.exports = { fetchQuestions };