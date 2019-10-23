
const auth = require('../helper/Auths')
const express = require('express')
const Route = express.Router()
const jobControllers = require('../controllers/jobs')

Route
.get('/',auth.authInfo,auth.authAccess,jobControllers.getJob)
.post('/',auth.authInfo,auth.authAccess, jobControllers.addJob)
.patch('/:JobID',auth.authInfo,auth.authAccess,jobControllers.updateJob)
.delete('/:JobID',auth.authInfo,auth.authAccess,jobControllers.deleteJob)
module.exports = Route