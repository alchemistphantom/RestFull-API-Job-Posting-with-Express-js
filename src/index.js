const express = require('express')
const Route = express.Router()
const Company = require('./routes/company')
const Job = require('./routes/jobs')


Route
.use('/company',Company)
.use('/job',Job)

module.exports = Route