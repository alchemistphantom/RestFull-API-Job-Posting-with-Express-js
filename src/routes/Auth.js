const express = require('express')
const Route = express.Router()
const AuthControllers = require('../controllers/Auth')

Route
.get('/',AuthControllers.Login)
.post('/',AuthControllers.Register)

module.exports = Route