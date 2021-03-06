/* eslint-disable max-len */
const redis = require("redis");
const port = 6000;
const client = redis.createClient();
const utils = require("../helper/utils");

client.on("connect", () => {
  console.log(`Redis client connected port ${port} `);
});

client.on("error", err => {
  console.log("Redis ERROR = " + err);
  client.quit();
});
module.exports = {
  getJobCached: function(req, res, next) {
    client.get(req.originalUrl, (err, result) => {
      if (result != null) {
        console.log("ada cahce bang");
        res.json({
          timeout: 10,
          massage: "Success get from redis cache",
          result: JSON.parse(result)
        });
      } else {
        next();
      }
    });
  },
  caching: (key, data) => {
    client.setex(key, 10, data);
  },
  delCache: function() {
    client.flushdb(function(err, succeeded) {
      console.log(succeeded); // will be true if successfull
    });
  }
};
