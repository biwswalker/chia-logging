require('dotenv').config()
const express = require('express')
const http = require('http')
const path = require("path")
const helmet = require('helmet')
const rateLimit = require("express-rate-limit")
const cors = require('cors')
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
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use('/api/v1', v1)

app.listen(5000, () => {
  console.log('Start server...')
  logs.listen()
})