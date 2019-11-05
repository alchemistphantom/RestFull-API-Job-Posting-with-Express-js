/* eslint-disable new-cap */
const express = require('express');
const Route = express.Router();
const AuthControllers = require('../controllers/users');

Route
    .post('/login', AuthControllers.Login)
    .post('/', AuthControllers.Register);
module.exports = Route;
