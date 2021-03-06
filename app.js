const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/configs/configs');
const routerNav = require('./src/index');
const logger = require('morgan');
const app = express();
const port = config.port;
const path = require('path');
const cors = require('cors');

app.listen(port, function() {
  console.log(`Server Listening on port ${port}`);
});

app.use('/src/images', express.static(path.join(__dirname, '/src/images')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routerNav);
app.use(logger('dev'));


module.exports = app;
