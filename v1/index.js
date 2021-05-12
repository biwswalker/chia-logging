const express = require('express')
const wallet_query = require('../querys/wallet')
const logs = require('../functions/tail')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ status: 'API V1.' })
})

router.get('/me', async (req, res) => {
    try {
        const wallet = await wallet_query.get_wallet()
        const response = {
            status: 200,
            balance: wallet
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ status: 400, error })
    }
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