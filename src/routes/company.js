const express = require('express')
const Route = express.Router()

const companyControllers = require('../controllers/companys')

Route.use('/',companyControllers.getCompany)
module.exports = Route