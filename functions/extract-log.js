const moment = require('moment')
const _ = require('lodash')
const wallet_query = require('../querys/wallet')
const harvester_draw_query = require('../querys/harvester_draw')
const plots_query = require('../querys/plots')
const discord = require('./discord')

const extract = (data, tag) => {
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
                const plots_regex = /\d+(?= plots were)+/g
                const proofs_regex = /(?<=Found )(.*\n?)(?= proofs)/g
                const time_regex = /(?<=Time: )(.*\n?)(?= s.)/g
                const total_plot_regex = /(?<=Total )(.*\n?)(?= plots)/g
                const plots = data_info.match(plots_regex)[0]
                const proofs = data_info.match(proofs_regex)[0]
                const timespen = data_info.match(time_regex)[0]
                const total_plot = data_info.match(total_plot_regex)[0]
                const created_at = moment(time).format()
                if (Number(plots) > 0) {
                    harvester_draw_query.insert_harvester_draw(plots, proofs, timespen, total_plot, created_at, tag)
                    console.log(`-----HARVESTER----- : 🌾 update harvester draw ${tag} > ${plots}`)
                    if (Number(proofs) > 0) {
                        discord(proofs, formated_created_at, timespen)
                    }
                }
                plots_query.update_plots(total_plot, tag)
                console.log(`-----PLOTS----- : 🌾 update plot draw ${tag} > ${total_plot}`)
            } else {
                console.log(`HARVESTER: ${sub_type} | ${data_info}`)
            }
        } else if (types === 'wallet') {
            if (_.isEqual(sub_type, 'chia.wallet.wallet_state_manager')) {
                if (data_info.includes('Confirmed balance amount is')) {
                    const wallet_balance = data_info.split('Confirmed balance amount is')[1].trim()
                    const acture = Number(wallet_balance | 0) / 1000000000000
                    // Wallet amount
                    wallet_query.update_wallet(acture)
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
}

module.exports = extract