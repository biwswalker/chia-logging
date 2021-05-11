const Tail = require('tail').Tail
const path = require('path')

const root_path = process.cwd().split(path.sep, 3).join('/')
console.log(`root: ${root_path}/.chia/mainnet/log/debug.log`)
const tail = new Tail(`${root_path}/.chia/mainnet/log/debug.log`)

const listen = () => {
    tail.on("line", function (data) {
        console.log(data.split(': INFO').map(text => text.trim()))
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
}