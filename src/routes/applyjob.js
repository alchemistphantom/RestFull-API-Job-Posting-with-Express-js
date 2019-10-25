/* eslint-disable new-cap */
const express = require('express');
const Route = express.Router();
const ApplyControllers = require('../controllers/applyjob');

Route
    .get('/', ApplyControllers.getApply)
    .post('/', ApplyControllers.addApply)
    .delete('/:ApplyID', ApplyControllers.deleteApply);
module.exports = Route;
