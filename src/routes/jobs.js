const express = require('express')
const Route = express.Router()

const jobControllers = require('../controllers/jobs')

Route
.get('/',jobControllers.getJob)
.post('/',jobControllers.addJob)

module.exports = Route