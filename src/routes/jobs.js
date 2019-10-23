
const express = require('express')
const Route = express.Router()
const jobControllers = require('../controllers/jobs')
const passport = require('passport');

app = express()
app.use(passport.initialize());
app.use(passport.session());
const isAuthenticate = passport.authenticate('jwt',{session:false})
require('../helper/passport')
Route
.get('/',jobControllers.getJob)
.post('/', jobControllers.addJob)
.patch('/:JobID',jobControllers.updateJob)
.delete('/:JobID',jobControllers.deleteJob)
module.exports = Route