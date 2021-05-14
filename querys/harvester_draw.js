const database = require('../db')

const insert_harvester_draw = (plots, proofs, time, draw_plots, created_at, tag) => new Promise((resolve, reject) => {
    const query = `INSERT INTO harvester_draw (plots, proofs, time, draw_plots, created_at, tag)
    VALUES (?, ?, ?, ?, ?, ?)
    `
    const seq_data = [plots, proofs, time, draw_plots, created_at, tag]
    database.run(query, seq_data, (err, result) => {
        if (err) {
            return reject(err)
        }
        return resolve(result)
    })
})

const get_harvester_draw = (limit = 10) => new Promise((resolve, reject) => {
    const query = `SELECT * FROM harvester_draw ORDER BY id DESC LIMIT ?`
    database.all(query, [limit], (err, result) => {
        if (err) {
            return reject(err)
        }
        return resolve(result)
    })
})

const get_challenge_per_day = (limit = 3) => new Promise((resolve, reject) => {
    const query = `
    SELECT strftime('%d-%m-%Y', created_at) as harvester_date, SUM(plots) as total_plot 
    FROM harvester_draw GROUP BY harvester_date ORDER BY harvester_date DESC LIMIT ?
    `
    database.all(query, [limit], (err, result) => {
        if (err) {
            return reject(err)
        }
        return resolve(result)
    })
})

module.exports = {
    insert_harvester_draw,
    get_harvester_draw,
    get_challenge_per_day,
}