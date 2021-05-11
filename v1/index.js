const express = require('express')
const logs = require('../functions/tail')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('unlisten.')
    logs.unlisten()
    res.status(200).json({ status: 'Unlistened.' })
})

module.exports = router