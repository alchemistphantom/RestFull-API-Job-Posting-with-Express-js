/* eslint-disable camelcase */
const ApplyModels = require("../models/applyjob");
const utils = require("../helper/utils");
const uuid = require("uuid/v4");

module.exports = {
  getApply: function(req, res) {
    ApplyModels.getApply()
      .then(result => {
        let message = "succsess  get apply job data";
        if (result.length !== 0) {
          res.json({
            status: 201,
            success: true,
            message,
            data: result
          });
        } else {
          message = "Not Found Data";
          res.json({
            status: 400,
            success: false,
            message,
            data: result
          });
        }
        // utils.chekingData(res, result, 'apply data is empty');
      })
      .catch(err => {
        res.status(400).json("failed to get data");
        console.log(err);
      });
  },
  addApply: function(req, res) {
    const id = uuid();
    const date_apply = new Date();
    const { user_id, job_id } = req.body;
    const data = {
      id,
      user_id,
      job_id,
      date_apply
    };
    ApplyModels.verifyApply(user_id, job_id)
      .then(result => {
        if (result.length != 0) {
          res.json({
            status: 200,
            success: true,
            message: "user already applied this Job!",
            data
          });
        } else {
          ApplyModels.addApply(data)
            .then(result => {
              res.json({
                status: 200,
                success: true,
                message: "success applied job",
                data
              });
            })
            .catch(err => {
              res.json({
                status: 400,
                success: false,
                message: "failed applied this Job!",
                err: err
              });
              console.log(err);
            });
        }
      })
      .catch(err => {
        res.json({
          status: 400,
          success: false,
          message: "failed!",
          err: err
        });
        console.log(err);
      });
  },
  deleteApply: function(req, res) {
    const ApplyID = req.params.ApplyID;
    ApplyModels.deleteApply(ApplyID)
      .then(result => {
        res.json({
          status: 200,
          success: true,
          message: "success delete applied job",
          data
        });
      })
      .catch(err => {
        res.json({
          status: 400,
          success: false,
          message: "failed to delete data",
          err: err
        });
        console.log(err);
      });
  }
};
