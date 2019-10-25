/* eslint-disable new-cap */
const express = require('express');
const Route = express.Router();
const Company = require('./routes/company');
const Job = require('./routes/jobs');
const Category = require('./routes/categorys');
const User = require('./routes/users');
const applyjob = require('./routes/applyjob');

Route
    .use('/company', Company)
    .use('/job', Job)
    .use('/Category', Category)
    .use('/user', User )
    .use('/applyjob', applyjob);
module.exports = Route;
