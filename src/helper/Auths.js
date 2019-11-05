/* eslint-disable max-len */
const JWT = require('jsonwebtoken');
const config = require('../configs/configs');

module.exports = {
  authInfo: (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const headerSecret = req.headers['x-access-token'];
    console.log(headerAuth);
    console.log(config.headerSecret);
    if (headerAuth !==config.headerSecret) {
      return res.status(404).json({
        status: 404,
        message: 'Unauthorized, Need Authentication'});
    } else {
      if (typeof headerSecret === 'undefined') {
        console.log('Token not existed! but Auth defined');
        next();
      } else {
        req.token = headerSecret;
        console.log('Token stored!');
        next();
      }
    }
  },
  authAccess: (req, res, next) => {
    const accessToken = req.token;
    JWT.verify(accessToken, config.jwtSecret, (err, decoded) => {
      if (err && err.name === 'TokenExpiredError') {
        return res.json({
          status: 403,
          message: 'Token expired!'});
      }

      if (err && err.name === 'JsonWebTokenError') {
        return res.status(403).json({
          status: 403,
          message: 'Token invalid!'});
      }

      console.log('Access Granted!');
      next();
    });
  },
};
