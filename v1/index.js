const express = require('express')
const logs = require('../functions/tail')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ status: 'API V1.' })
})

router.get('/unlisten-log', (req, res) => {
    console.log('unlisten.')
    logs.unlisten()
    res.status(200).json({ status: 'Unlistened.' })
})

router.get('/listen-log', (req, res) => {
    console.log('listen.')
    logs.watch()
    res.status(200).json({ status: 'Listened.' })
})


module.exports = router