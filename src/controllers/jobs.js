/* eslint-disable camelcase */
/* eslint-disable max-len */
const jobModels = require("../models/jobs");
const uuid = require("uuid/v4");
const redis = require("../helper/redis");
const utils = require("../helper/utils");
const moment = require("moment");
const baselink = "http://ec2-54-167-195-205.compute-1.amazonaws.com:3000/job/";

module.exports = {
  getAllJob: function(req, res) {
    jobModels
      .getCount()
      .then(result => {
        let count = result[0].count;
        let { wordsKey, words, sortBy, mode, limit, page } = req.query;
        sortBy = sortBy || "date_added";
        mode = mode || "asc";
        wordsKey = wordsKey || "name";
        limit = limit || 5;
        page = page || 1;
        words = words || "";
        const offset = (page - 1) * limit;
        console.log(wordsKey);
        jobModels
          .getAllJob(wordsKey, words, sortBy, mode, limit, offset)
          .then(result => {
            if (result.length != 0) {
            } else {
              res.json(words + " Data Not Found");
            }
            if (wordsKey !== null) {
              count = result.length;
            }
            const page_count = Math.ceil(count / limit);
            let hasPrev;
            let hasNext;
            let prev = page - 1;

            if (prev == 0) {
              prev = 1;
              hasPrev = false;
            } else {
              hasPrev = true;
            }
            let next = parseInt(page) + 1;
            if (next > page_count) {
              next = page_count;
              hasNext = false;
            } else {
              hasNext = true;
            }
            let message = "sucsess get data";
            if (count === 0) {
              message = "Data Not Found";
            }
            const dataResult = {
              info: {
                status: 200,
                error: false,
                message,
                page: page,
                Result_count: result.length,
                page_count: page_count,
                limit: limit,
                count_data: count,
                hasPrev: hasPrev,
                hasNext: hasNext,
                prev: baselink + `?page=${prev}`,
                next: baselink + `?page=${next}`
              },
              result
            };
            res.json({ dataResult });
            const data = JSON.stringify(dataResult);
            redis.caching(req.originalUrl, data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  addJob: function(req, res) {
    redis.delCache();
    const id = uuid();
    const date_added = moment(new Date(), "MM-DD-YYYY");
    const date_updated = "";
    const {
      name,
      description,
      id_category,
      salary,
      location,
      id_company
    } = req.body;
    const data = {
      id,
      name,
      description,
      id_category,
      salary,
      location,
      id_company,
      date_added,
      date_updated
    };
    jobModels
      .verifyCompany(name)
      .then(result => {
        if (result.length != 0) {
          res.json({
            status: 202,
            message: "data already exist!",
            result
          });
        } else {
          jobModels
            .addJob(data)
            .then(result => {
              res.json({
                status: 200,
                success: true,
                message: "success insert job data",
                inserted: data
              });
            })
            .catch(err => {
              res.json({
                status: 400,
                message: "failed insert job data!",
                err: err
              });
              console.log(err);
            });
        }
      })
      .catch(err => {
        res.json({
          message: "failed!",
          err: err
        });
        console.log(err);
      });
  },

  updateJob: function(req, res) {
    redis.delCache();
    // redis.delCache('/job/');
    const JobID = req.params.JobID;
    const date_updated = new Date();
    req.body.date_updated = date_updated;
    const data = req.body;
    jobModels
      .updateJob(data, JobID)
      .then(() => {
        res.json({
          status: 200,
          success: true,
          message: "success update job",
          updated: data
        });
      })
      .catch(err => {
        res.json({
          status: 400,
          success: false,
          message: "faield to update job",
          err
        });
      });
  },
  deleteJob: function(req, res) {
    redis.delCache();

    // redis.delCache(req.originalUrl);
    const JobID = req.params.JobID;
    jobModels
      .deleteJob(JobID)
      .then(result => {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "success delete job",
          deleted: JobID
        });
      })
      .catch(err => {
        res.json({
          status: 400,
          success: false,
          message: "failed delete job data!",
          err: err
        });
        console.log(err);
      });
  },
  singleJob: function(req, res) {
    redis.delCache();

    // redis.delCache(req.originalUrl);
    const JobID = req.params.JobID;
    jobModels
      .singleJob(JobID)
      .then(result => {
        if (result.length > 0) {
          res.status(200).json({
            status: 200,
            success: true,
            message: "success get single job",
            result
          });
        } else {
          res.json({
            status: 200,
            success: false,
            message: "not found data",
            result
          });
        }
      })
      .catch(err => {
        res.json({
          message: "failed get single job data!",
          err: err
        });
        console.log(err);
      });
  }
};
