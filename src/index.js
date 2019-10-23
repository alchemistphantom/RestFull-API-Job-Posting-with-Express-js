const express = require('express')
const Route = express.Router()
const Company = require('./routes/company')
const Job = require('./routes/jobs')
const Category = require('./routes/categorys')
const Auth = require('./routes/Auth')

Route
.use('/company',Company)
.use('/job',Job)
.use('/Category',Category)
.use('/Auth',Auth)

module.exports = Route