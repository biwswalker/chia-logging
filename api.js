const express = require('express')
const http = require('http')
const path = require("path")
const helmet = require('helmet')
const rateLimit = require("express-rate-limit")
// const gat_dashboard = require('./scrape')
const logs = require('./functions/tail')
const v1 = require('./v1')
require("./db")

const app = express()
const server = http.createServer(app)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use(helmet())
app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use('/api/v1', v1)

// app.get('/', function (req, res) {
// const { ploting_data, plot_count, capacity, ttw } = ({ ploting_data: [[1, 2, 3], [4, 5, 6]], plot_count: 0, capacity: 0, ttw: 0 })
// res.render('dashboard.html', { ploting_data, plot_count, capacity, ttw })

// gat_dashboard().then(({ ploting_data, plot_count, capacity, ttw }) => {
//   res.render('dashboard.html', { ploting_data, plot_count, capacity, ttw })
// })
// });

app.listen(5000, () => {
  console.log('Start server...')
  console.log('listen chia log.')
  logs.listen()
})