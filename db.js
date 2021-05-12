const sqlite = require('sqlite3').verbose()

const DBSOURCE = 'chiadb'

const database = new sqlite.Database(DBSOURCE, (err) => {
    if (err) {
        return console.log('DB:', err.message)
    }
    console.log('Connected to Database.')

    database.run(`
    CREATE TABLE "wallet" (
        "id"	INTEGER NOT NULL UNIQUE,
        "balance"	TEXT NOT NULL,
        "updated_at"	TEXT NOT NULL,
        PRIMARY KEY("id")
    );
    `,
        (err) => {
            if (err) {
                console.log('Wallet already created database.')
            }
        });
})

module.exports = database