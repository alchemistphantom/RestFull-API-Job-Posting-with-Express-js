/* eslint-disable camelcase */
/* eslint-disable max-len */
const jobModels = require('../models/jobs');
const uuid = require('uuid/v4');
const redis = require('../helper/redis');
const utils = require('../helper/utils');

module.exports = {
  getJob: function(req, res) {
    let {by, words, sortBy, mode, page, limit}= req.query;
    let offset;
    if (by!=undefined || words != undefined) {
      jobModels.searchJob(by, words)
          .then((result) => {
            if (result.length!=0) {
              const data = JSON.stringify(result);
              redis.caching(req.originalUrl, data);
              utils.chekingData(res, result, ' data job is empty');
            } else {
              res.json(words+' Data Not Found');
            }
          })
          .catch((err) => {
            console.log(err);
          });
    } else if ((sortBy!=undefined || mode != undefined) || (page!=undefined || limit != undefined)) {
      if (sortBy==undefined && mode == undefined) {
        sortBy='date_added';
        mode = 'asc';
      } else if ((page==undefined && limit == undefined) && offset==undefined) {
        page=1;
        limit=5;
      }
      offset =(page-1)*limit;
      jobModels.sortPaging(sortBy, mode, limit, offset)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
    } else {
      jobModels.getJob()
          .then((result)=>{
            const data = JSON.stringify(result);
            redis.caching(req.originalUrl, data);
            res.json(result);
          })
          .catch((err)=>{
            console.log(err);
          });
    }
  },
  addJob: function(req, res) {
    redis.delCache();
    const id = uuid();
    const date_added = new Date();
    const date_updated ='';
    const {name, description, id_category, salary, location, id_company} = req.body;
    const data = {
      id,
      name,
      description,
      id_category,
      salary,
      location,
      id_company,
      date_added,
      date_updated,
    };
    jobModels.verifyCompany(name)
        .then((result) => {
          if (result.length!=0) {
            res.json({
              message: 'data already exist!',
              result});
          } else {
            jobModels.addJob(data)
                .then((result) => {
                  res.json({
                    message: 'success insert job data',
                    result});
                })
                .catch((err) => {
                  res.json({
                    message: 'failed insert job data!',
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
  updateJob: function(req, res) {
    redis.delCache();
    // redis.delCache('/job/');
    const JobID = req.params.JobID;
    const date_updated = new Date();
    req.body.date_updated = date_updated;
    console.log(JobID);
    const data = req.body;
    jobModels.updateJob(data, JobID)
        .then((result) => {
          res.json(result); res.json({
            message: 'success update job',
            result,
          });
        })
        .catch((err) => {
          res.json({
            message: 'faield to update job',
            err,
          });
          console.log(err);
        });
  },
  deleteJob: function(req, res) {
    redis.delCache(req.originalUrl);
    const JobID = req.params.JobID;
    jobModels.deleteJob(JobID)
        .then((result) => {
          res.status(200).json({
            message: 'success delete job',
            result,
          });
        })
        .catch((err) => {
          res.json({
            message: 'failed delete job data!',
            err: err});
          console.log(err);
        });
  },
};
