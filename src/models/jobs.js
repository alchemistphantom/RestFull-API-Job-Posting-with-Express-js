/* eslint-disable max-len */
const conn = require('../configs/db');
module.exports={
  getJob: function(limit, offset) {
    return new Promise(function(resolve, reject) {
      conn.query('SELECT * FROM view_data LIMIT 5 OFFSET 0', function(err, result) {
        if (!err) {
          resolve({result, count_data: result.length});
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addJob: function(data) {
    return new Promise(function(resolve, reject) {
      conn.query('INSERT INTO tb_job SET ?', data, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateJob: function(data, jobID) {
    return new Promise(function(resolve, reject) {
      conn.query('UPDATE tb_job SET ? WHERE id = ?', [data, jobID], function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteJob: function(jobID) {
    return new Promise(function(resolve, reject) {
      conn.query('DELETE FROM tb_job WHERE id = ?', [jobID], function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  searchJob: function(by, name) {
    return new Promise(function(resolve, reject) {
      conn.query(`SELECT * FROM view_data WHERE ${by} LIKE ?`, '%' + name + '%', function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  getAllJob: function(wordsKey, words, sortBy, mode, limit, offset) {
    return new Promise(function(resolve, reject) {
      conn.query(`SELECT * FROM view_data WHERE ${wordsKey} LIKE ? ORDER\
       BY ${sortBy} ${mode} LIMIT ? OFFSET ? \
       `, ['%'+ words +'%', parseInt(limit), parseInt(offset)], function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  sortPaging: function(by, mode, limit, offset) {
    return new Promise(function(resolve, reject) {
      conn.query(`SELECT * FROM view_data ORDER BY ${by} ${mode} LIMIT ? OFFSET ? `, [parseInt(limit), parseInt(offset)], function(err, result) {
        if (!err) {
          {
            resolve(result);
          }
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  verifyCompany: function(name) {
    const qry = 'SELECT * FROM tb_job WHERE name = ? ';
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
  getCount: function() {
    const qry = 'SELECT COUNT(*) as count FROM view_data';
    return new Promise(function(resolve, reject) {
      conn.query(qry, function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
