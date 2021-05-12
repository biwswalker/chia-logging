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
                return console.log('Wallet already created database.')
            } else {
                console.log('Created Wallet database.')
            }
        })

    database.run(`
    CREATE TABLE "harvester_draw" (
        "id"	INTEGER NOT NULL UNIQUE,
        "plots"     TEXT NOT NULL,
        "proofs"    TEXT NOT NULL,
        "time"  TEXT NOT NULL,
        "draw_plots" TEXT NOT NULL,
        "created_at" TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    );
    `,
        (err) => {
            if (err) {
                return console.log('Harvester draw already created database.', err)
            }
            console.log('Created Harvester draw database.')
        })
})

module.exports = database