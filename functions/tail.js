const Tail = require('tail').Tail
const path = require('path')
const moment = require('moment')
const _ = require('lodash')

const wallet_query = require('../querys/wallet')

const root_path = process.cwd().split(path.sep, 3).join('/')
console.log(`root: ${root_path}/.chia/mainnet/log/debug.log`)
// const options = { separator: /[\r]{0,1}\n/, fromBeginning: false, follow: true, logger: console }
const tail = new Tail(`${root_path}/.chia/mainnet/log/debug.log`)

const listen = () => {
    tail.on("line", function (data) {
        const splited = data.split(': INFO').map(text => text.trim())
        if (splited.length > 0) {
            const types_info = splited[0].split(' ')
            const data_info = splited[1]
            const time = types_info[0]
            const types = types_info[1]
            const sub_type = types_info[2]
            if (types === 'farmer') {
                console.log(`FARMER: ${sub_type} | ${data_info}`)
            } else if (types === 'harvester') {
                if (_.isEqual(sub_type, 'chia.harvester.harvester')) {
                    console.log(`FARM HARVESTER: ${moment(time).format('DD MM YYYY ::: HH:mm:ss')} ${sub_type} | ${data_info}`)
                } else {
                    console.log(`HARVESTER: ${sub_type} | ${data_info}`)
                }
            } else if (types === 'wallet') {
                if (_.isEqual(sub_type, 'chia.wallet.wallet_state_manager')) {
                    if (data_info.includes('Confirmed balance amount is')) {
                        const wallet_balance = data_info.split('Confirmed balance amount is')[1].trim()
                        // Wallet amount
                        wallet_query.update_wallet(wallet_balance)
                        console.log(`-----WALLET----- : 💲 update wallet > ${wallet_balance}`)
                    }
                } else if (_.isEqual(sub_type, 'chia.wallet.wallet_blockchain')) {
                    console.log('-----BLOCKCHAIN----- : ', data_info)
                } else {
                    console.log(`WALLET: ${sub_type} | ${data_info}`)
                }
            } else {
                console.log(`------------:${data}`)
            }
        } else {
            console.log(data.split(': INFO').map(text => text.trim()))
        }
    })
    tail.on("error", function (error) {
        console.log('ERROR: ', error)
    })
}

module.exports = {
    listen,
    unwatch: tail.unwatch,
    watch: tail.watch
}