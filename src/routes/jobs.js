/* eslint-disable max-len */
/* eslint-disable new-cap */

const auth = require('../helper/Auths');
const express = require('express');
const Route = express.Router();
const jobControllers = require('../controllers/jobs');
const redis = require('../helper/redis');

Route
    .get('/', redis.getJobCached, jobControllers.getAllJob)
    .post('/', auth.authInfo, auth.authAccess, jobControllers.addJob)
    .patch('/:JobID', auth.authInfo, auth.authAccess, jobControllers.updateJob)
    .delete('/:JobID', auth.authInfo, auth.authAccess, jobControllers.deleteJob);
module.exports = Route;
