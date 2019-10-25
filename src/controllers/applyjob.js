/* eslint-disable camelcase */
const ApplyModels = require('../models/applyjob');
const utils = require('../helper/utils');
const uuid = require('uuid/v4');

module.exports = {
  getApply: function(req, res) {
    ApplyModels.getApply()
        .then((result)=>{
          utils.chekingData(res, result, 'apply data is empty');
        })
        .catch((err)=>{
          res.status(400).json('failed to get data');
          console.log(err);
        });
  },
  addApply: function(req, res) {
    const id = uuid();
    const date_apply = new Date();
    const {user_id, job_id} = req.body;
    const data = {
      id,
      user_id,
      job_id,
      date_apply,
    };
    ApplyModels.verifyApply(user_id, job_id)
        .then((result) => {
          if (result.length!=0) {
            res.json({
              message: 'user already applied this Job!',
              result});
          } else {
            ApplyModels.addApply(data)
                .then((result) => {
                  res.json({
                    message: 'success applied job',
                    result});
                })
                .catch((err) => {
                  res.json({
                    message: 'failed applied this Job!',
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
  deleteApply: function(req, res) {
    const ApplyID = req.params.ApplyID;
    ApplyModels.deleteApply(ApplyID)
        .then((result) => {
          res.json({
            message: 'success delete applied job',
            result,
          });
        })
        .catch((err) => {
          res.json({
            message: 'failed',
            err: err});
          console.log(err);
        });
  },
};
