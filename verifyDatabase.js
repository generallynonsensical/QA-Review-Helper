const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

db.serialize(() => {
    db.all(`SELECT * FROM questions`, (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(rows);
    });
});

db.close();