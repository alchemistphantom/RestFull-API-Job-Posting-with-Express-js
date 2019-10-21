const express = require('express')
const Route = express.Router()
const jobControllers = require('../controllers/jobs')

Route
.get('/',jobControllers.getJob)
.post('/',jobControllers.addJob)
.patch('/:JobID',jobControllers.updateJob)
.delete('/:JobID',jobControllers.deleteJob)
.get('/search',jobControllers.byName)
.get('/search',jobControllers.byCompany)
.get('/sortBy/:sortBy/:mode',jobControllers.sortBy)

module.exports = Route