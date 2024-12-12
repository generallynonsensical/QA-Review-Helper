const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/audit_questions.db');

function fetchQuestions(mainIndex, callback) {
    db.all(`SELECT "#" as number, question FROM audit_questions WHERE "#" LIKE ?`, [`${mainIndex}.%`], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback([]);
        } else {
            callback(rows);
        }
    });
}

module.exports = { fetchQuestions };