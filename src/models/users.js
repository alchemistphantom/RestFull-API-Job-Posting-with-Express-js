/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable max-len */
const conn = require("../configs/db");
module.exports = {
  Register: function(data) {
    return new Promise(function(resolve, reject) {
      const qry = "INSERT INTO tb_user SET ?";
      conn.query(qry, data, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  Login: function(username, password) {
    return new Promise(function(resolve, reject) {
      conn.query(
        "SELECT * FROM tb_user WHERE email = ? AND passwordHash = ?",
        [username, password],
        function(err, result) {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  VerifyEmail: function(email) {
    const qry = "SELECT * FROM tb_user WHERE email = ? ";
    return new Promise(function(resolve, reject) {
      conn.query(qry, email, function(err, result) {
        if (!err) {
          resolve(result);
          // result.password;
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getUser: function() {
    return new Promise(function(resolve, reject) {
      conn.query("SELECT * FROM tb_user  ", function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
