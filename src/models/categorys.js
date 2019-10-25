/* eslint-disable max-len */
const conn = require('../configs/db');

module.exports={
  getCategory: function() {
    return new Promise(function(resolve, reject) {
      conn.query('SELECT * FROM tb_category', function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addCategory: function(data) {
    return new Promise(function(resolve, reject) {
      conn.query('INSERT INTO tb_category SET ?', data, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateCategory: function(data, CategoryID) {
    return new Promise(function(resolve, reject) {
      conn.query('UPDATE tb_category SET ? WHERE id = ?', [data, CategoryID], function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteCategory: function(CategoryID) {
    return new Promise(function(resolve, reject) {
      conn.query('DELETE FROM tb_category WHERE id = ?', CategoryID, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  verifyCategory: function(name) {
    const qry = 'SELECT * FROM tb_category WHERE name = ? ';
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
};
