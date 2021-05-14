const moment = require('moment')
const database = require('../db')

const update_plots = (amount, tag) => new Promise((resolve, reject) => {
    const query = `INSERT OR REPLACE INTO plots (tag, amount, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT (tag) DO
    UPDATE SET amount=excluded.amount, updated_at=excluded.updated_at
    `
    const seq_data = [tag, amount, moment().format()]
    database.run(query, seq_data, (err, result) => {
        if (err) {
            return reject(err)
        }
        return resolve(result)
    })
})

const get_plots = () => new Promise((resolve, reject) => {
    const query = `select * from plots`
    database.all(query, (err, result) => {
        if (err) {
            return reject(err)
        }
        return resolve(result)
    })
})

const get_plot_by_tag = (tag) => new Promise((resolve, reject) => {
    const query = `select * from plots WHERE tag = ?`
    database.get(query, [tag], (err, result) => {
        if (err) {
            return reject(err)
        }
        return resolve(result)
    })
})
module.exports = {
    update_plots,
    get_plots,
    get_plot_by_tag,
}