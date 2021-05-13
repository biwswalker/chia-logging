const moment = require('moment')
const database = require('../db')

const insert_harvester_draw = (plots, proofs, time, draw_plots, created_at) => new Promise((resolve, reject) => {
    const query = `INSERT INTO harvester_draw (plots, proofs, time, draw_plots, created_at)
    VALUES (?, ?, ?, ?, ?)
    `
    const seq_data = [plots, proofs, time, draw_plots, created_at]
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
module.exports = {
    insert_harvester_draw,
    get_harvester_draw,
}