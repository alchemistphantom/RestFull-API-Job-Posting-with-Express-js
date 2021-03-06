/* eslint-disable max-len */
const conn = require("../configs/db");

module.exports = {
  getCompany: function() {
    return new Promise(function(resolve, reject) {
      conn.query("SELECT * FROM tb_company", function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addCompany: function(data) {
    return new Promise(function(resolve, reject) {
      conn.query("INSERT INTO tb_company SET ?", data, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateCompany: function(data, companyID) {
    return new Promise(function(resolve, reject) {
      conn.query(
        "UPDATE tb_company SET ? WHERE id = ?",
        [data, companyID],
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
  deleteCompany: function(companyID) {
    return new Promise(function(resolve, reject) {
      conn.query("DELETE FROM tb_company WHERE id = ?", companyID, function(
        err,
        result
      ) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  verifyCompany: function(name) {
    const qry = "SELECT * FROM tb_company WHERE name = ? ";
    return new Promise(function(resolve, reject) {
      conn.query(qry, name, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  verifyCompanyId: function(id) {
    const qry = "SELECT * FROM tb_company WHERE id= ? ";
    return new Promise(function(resolve, reject) {
      conn.query(qry, id, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
