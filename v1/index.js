const express = require('express')
const observelog = require('../functions/tail')
const router = express.Router()

router.get('/getalllog', function (req, res) {
    // observelog()
    res.status(200).json({ status: 'requested.' })
})

module.exports = router