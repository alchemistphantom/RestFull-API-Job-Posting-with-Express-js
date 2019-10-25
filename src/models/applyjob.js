/* eslint-disable max-len */
const conn = require('../configs/db');

module.exports={
  getApply: function() {
    return new Promise(function(resolve, reject) {
      conn.query('SELECT * FROM view_Apply', function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addApply: function(data) {
    return new Promise(function(resolve, reject) {
      conn.query('INSERT INTO tb_Apply SET ?', data, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateApply: function(data, ApplyID) {
    return new Promise(function(resolve, reject) {
      conn.query('UPDATE tb_Apply SET ? WHERE id = ?', [data, ApplyID], function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteApply: function(ApplyID) {
    return new Promise(function(resolve, reject) {
      conn.query('DELETE FROM tb_Apply WHERE id = ?', ApplyID, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  verifyApply: function(user, job) {
    const qry = 'SELECT * FROM tb_apply WHERE user_id = ? AND job_id =? ';
    return new Promise(function(resolve, reject) {
      conn.query(qry, [user, job], function(err, result) {
        if (!err) {
          resolve(result);
          // result.password;
        } else {
          reject(new Error(err));
        }
      });
    });
  },

};
