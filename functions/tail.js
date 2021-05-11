const Tail = require('tail').Tail
const path = require('path')

const tailing_log = () => {
    const root_path = process.cwd().split(path.sep, 3).join('/')
    console.log(`root: ${root_path}/.chia/mainnet/log/debug.log`)
    const tail = new Tail(`${root_path}/.chia/mainnet/log/debug.log`);
    tail.on("line", function (data) {
        console.log(data);
    })
    tail.on("error", function (error) {
        console.log('ERROR: ', error)
    })
}

module.exports = tailing_log