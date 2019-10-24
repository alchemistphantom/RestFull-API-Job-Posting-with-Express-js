const init = require('../configs/configs')
const redis = require("redis");
const port = 6000;
const client = redis.createClient();

client.on('connect', () => {
  console.log(`Redis client connected port ${port} `)
})
  
client.on('error', (err) => {
  console.log('Redis ERROR = ' + err)
  client.quit();
})
module.exports = {
  getJobCached:function (req, res, next){
    client.get(req.originalUrl,(err,result) =>{
      if(result != null){
        res.json({
          massage : "Success get from",
          result : JSON.parse(result)
        });
      }else{
        next();
      }
    })
},
  caching:(key, data)=>{
    client.setex(key,60*60, data)
  }
,
  delCache: function(key){
    client.del(key)
  }
}
