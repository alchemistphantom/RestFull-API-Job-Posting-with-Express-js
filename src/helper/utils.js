/* eslint-disable max-len */
const crypto = require('crypto');
const regex =/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

module.exports = {
  chekingData: function(res, result, message) {
    if (result.length!=0) {
      res.json({
        count_data: result.length,
        result});
    } else {
      res.json(message);
    }
  },
  response: (res, status, data) => {
    console.log('Response');
  },
  customErrorResponse: (res, status, message) => {
    console.log('Error Response!');
  },
  generateSalt: (length) => {
    console.log('Generate Salt!');
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  },
  setPassword: (password, salt) => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt: salt,
      passwordHash: value,
    };
  },
  comparingPassword: (passwordDb, password) => {
    if (passwordDb==password) {
      return true;
    }
    return false;
  },
  getAllResponse: (res, status, error, message, result, page, limit, totalPage, totalData) => {
    res.json({
      status: status,
      error: error,
      message: message,
      page: page,
      limit: limit,
      totalPage,
      totalData,
      data: result,
    });
    console.log('Error Response!');
  },

  response: (res, status, error, message, result) => {
    res.json({
      status: status,
      error: error,
      message: message,
      data: result,
    });
    console.log('Error Response!');
  },

  checkValidEmail: (email) => {
    if (regex.test(email)) {
      return true;
    }
  },

};
