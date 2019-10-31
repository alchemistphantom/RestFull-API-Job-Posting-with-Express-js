const companyModels = require('../models/companys');
const uuid = require('uuid/v4');
const utils = require('../helper/utils');

module.exports = {
  getCompany: function(req, res) {
    companyModels.getCompany()
        .then((result)=>{
          utils.chekingData(res, result, ' data company is empty');
        })
        .catch((err)=>{
          res.status(400).json('failed to get data');
          console.log(err);
        });
  },
  addCompany: function(req, res) {
    const id = uuid();
    const {name, location, description} = req.body;
    const host = req.hostname;
    const logo = req.protocol+'://'+host+':'+process.env.PORT+'/src/images/'+req.file.filename;
    const data = {
      id,
      name,
      logo,
      location,
      description,
    };
    companyModels.verifyCompany(name)
        .then((result) => {
          if (result.length!=0) {
            res.json({
              status: 200,
              message: 'data already exist!',
              data});
          } else {
            companyModels.addCompany(data)
                .then((result) => {
                  res.json({
                    status: 401,
                    message: 'success insert company data',
                    data});
                })
                .catch((err) => {
                  res.json({
                    status: 400,
                    message: 'failed insert company data!',
                    err: err});
                  console.log(err);
                });
          }
        })
        .catch((err) => {
          res.json({
            message: 'failed!',
            err: err});
          console.log(err);
        });
  },
  updateCompany: function(req, res) {
    const companyID = req.params.companyID;
    const data = req.body;
    console.log(companyID);
    companyModels.updateCompany(data, companyID)
        .then((result) => {
          res.json({
            message: 'success update company',
            result,
          });
        })
        .catch((err) => {
          res.json({
            message: 'faield to update company',
            err,
          });
          console.log(err);
        });
  },
  deleteCompany: function(req, res) {
    const companyID = req.params.companyID;
    companyModels.deleteCompany(companyID)
        .then((result) => {
          res.json({
            message: 'success delete company',
            result,
          });
        })
        .catch((err) => {
          res.json({
            message: 'failed delete company data!',
            err: err});
          console.log(err);
        });
  },
  uploadLogo: function() {

  },
};
