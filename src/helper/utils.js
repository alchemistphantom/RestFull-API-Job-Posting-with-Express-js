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
  responseGetll: (res, status, error, message, page, count, resultCount, pageCount, limit, data) => {
    res.json({
      status: status,
      error: error,
      message: message,
      page: page,
      count_data: count,
      result_count: resultCount,
      page_count: pageCount,
      limit: limit,
      data,
    });
  },
  response: (res, status, error, message) => {
    res.json({
      status: status,
      error: error,
      message: message,
    });
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
  checkValidEmail: (email) => {
    if (regex.test(email)) {
      return true;
    }
  },
  checking_field: (res, data)=> {
    const values = Object.values(data);
    for (let i=1; i<values.length-1; i++) {
      console.log(values[i]);
      if (values[i]!=null) {
        console.log('ada isinya');
        return true;
      }
    }
  },
};
