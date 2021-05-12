const moment = require('moment')
const database = require('../db')

const update_wallet = (balance) => new Promise((resolve, reject) => {
    const query = `INSERT INTO wallet (id, balance, updated_at)
    VALUES (1, ?, ?)
    ON CONFLICT (id) DO
    UPDATE SET balance=excluded.balance, updated_at=excluded.updated_at
    `
    const seq_data = [balance, moment().format()]
    database.run(query, seq_data, (err, result) => {
        if (err) {
            return reject(err)
        }
        return resolve(result)
    })
})

const get_wallet = () => new Promise((resolve, reject) => {
    const query = `select * from wallet`
    database.get(query, (err, result) => {
        if (err) {
            return reject(err)
        }
        return resolve(result)
    })
})
module.exports = {
    update_wallet,
    get_wallet,
}