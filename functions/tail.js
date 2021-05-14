const Tail = require('tail').Tail
const path = require('path')
const extract_log = require('./extract-log')

const root_path = process.cwd().split(path.sep, 3).join('/')
console.log(`root: ${root_path}/.chia/mainnet/log/debug.log`)
const tail = new Tail(`${root_path}/.chia/mainnet/log/debug.log`)

const listen = () => {
    tail.on("line", (data) => extract_log(data, 'main'))
    tail.on("error", function (error) {
        console.log('ERROR: ', error)
    })
}

module.exports = {
    listen,
    unwatch: tail.unwatch,
    watch: tail.watch
}