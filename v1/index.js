const express = require('express')
const logs = require('../functions/tail')
const router = express.Router()

router.get('/unlisten-log', function (req, res) {
    console.log('unlisten.')
    logs.unlisten()
    res.status(200).json({ status: 'Unlistened.' })
})

module.exports = router