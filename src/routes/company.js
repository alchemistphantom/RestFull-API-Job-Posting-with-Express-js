const express = require('express')
const Route = express.Router()

const companyControllers = require('../controllers/companys')

Route
.get('/',companyControllers.getCompany)
.post('/',companyControllers.addCompany)
.patch('/:companyID',companyControllers.updateCompany)
.delete('/:companyID',companyControllers.updateCompany)


module.exports = Route