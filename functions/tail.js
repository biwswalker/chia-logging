const Tail = require('tail').Tail
const path = require('path')
const moment = require('moment')
const _ = require('lodash')

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
                console.log('sub_type')
                if (_.isEqual(sub_type.trim(), 'chia.harvester.harvester')) {
                    console.log(`FARMING: ${moment(time).format('DD MM YYYY ::: HH:mm:ss')} ${sub_type} | ${data_info}`)
                } else {
                    console.log(`HARVESTER: ${sub_type} | ${data_info}`)
                }
            } else if (types === 'wallet') {
                console.log(`WALLET: ${sub_type} | ${data_info}`)
            } else {
                // console.log(`WALLET: ${sub_type} | ${data_info}`)
            }
        } else {
            console.log(data.split(': INFO').map(text => text.trim()))
        }
    })
    tail.on("error", function (error) {
        console.log('ERROR: ', error)
    })
}

const unlisten = () => {
    tail.unwatch()
    console.log('unlisten.')
}

module.exports = {
    listen,
    unlisten,
    watch: tail.watch
}