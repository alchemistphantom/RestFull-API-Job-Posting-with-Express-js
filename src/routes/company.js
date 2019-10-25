const express = require('express');
// eslint-disable-next-line new-cap
const Route = express.Router();

const companyControllers = require('../controllers/companys');

Route
    .get('/', companyControllers.getCompany)
    .post('/', companyControllers.addCompany)
    .patch('/:companyID', companyControllers.updateCompany)
    .delete('/:companyID', companyControllers.deleteCompany);

module.exports = Route;
