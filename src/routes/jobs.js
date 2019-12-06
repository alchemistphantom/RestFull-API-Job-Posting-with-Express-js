/* eslint-disable max-len */
/* eslint-disable new-cap */

const auth = require("../helper/Auths");
const express = require("express");
const Route = express.Router();
const jobControllers = require("../controllers/jobs");
const redis = require("../helper/redis");

Route.get("/:JobID", jobControllers.singleJob)
  .get("/", redis.getJobCached, jobControllers.getAllJob)
  .post("/", jobControllers.addJob)
  .patch("/:JobID", jobControllers.updateJob)
  .delete("/:JobID", jobControllers.deleteJob);
module.exports = Route;
