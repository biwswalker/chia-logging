const express = require('express')
const _ = require('lodash')
const moment = require('moment')
const wallet_query = require('../querys/wallet')
const harvester_draw_query = require('../querys/harvester_draw')
const plots_query = require('../querys/plots')
const get_farm_info = require('../functions/chia-status')
const logs = require('../functions/tail')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ status: 'API V1.' })
})

router.get('/me', async (req, res) => {
    try {
        const farm_status = await get_farm_info()
        const wallet = await wallet_query.get_wallet()
        const harvester_draw = await harvester_draw_query.get_harvester_draw(5)
        const challenge = await harvester_draw_query.get_challenge_per_day(3)
        const challenge_count = challenge.map(challenge => {
            const count = challenge.total_plot
            const date = moment(challenge.harvester_date, 'DD-MM-YYYY').format()
            return { date, count }
        })
        const plots = await plots_query.get_plots()
        const response = {
            status: 200,
            farm_status,
            plots,
            wallet,
            challenge_count,
            harvester_draw,
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 400, error })
    }
})

router.get('/unlisten', (req, res) => {
    console.log('unwatch.')
    logs.unwatch()
    res.status(200).json({ status: 'Unlistened.' })
})

router.get('/listen', (req, res) => {
    console.log('watch.')
    logs.watch()
    res.status(200).json({ status: 'Listened.' })
})

module.exports = router