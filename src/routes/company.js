const express = require('express');
// eslint-disable-next-line new-cap
const Route = express.Router();
const upload = require('../helper/uploads');
const companyControllers = require('../controllers/companys');

Route
    .get('/', companyControllers.getCompany)
    .post('/', upload.single('logo'), companyControllers.addCompany)
    .patch('/:companyID', companyControllers.updateCompany)
    .delete('/:companyID', companyControllers.deleteCompany);

module.exports = Route;
