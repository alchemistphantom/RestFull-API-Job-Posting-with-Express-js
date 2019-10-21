const express = require('express')
const Route = express.Router()
const Company = require('./routes/company')

Route.use('/company',Company)

module.exports = Route