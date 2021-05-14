const SSH = require('simple-ssh')
const extract_log = require('./extract-log')

const run = (sshConfig, script) => new Promise((resolve, reject) => {
    let scriptOutput = ''
    const sshFtw = new SSH(sshConfig)
    sshFtw.exec(script,
        { out: extract_log })
        .on('error', (err) => reject(err))
        .on('close', () => resolve(scriptOutput))
        .start()
})

const excute_log = () => {
    run({
        "host": process.env.REMOTE_HOST,
        "user": process.env.REMOTE_USER,
        "pass": process.env.REMOTE_PWD
    }, `tail -f ${process.env.REMOTE_LOG_LOCATION}`)
}

module.exports = excute_log