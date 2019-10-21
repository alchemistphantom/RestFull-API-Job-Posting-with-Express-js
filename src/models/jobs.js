const conn = require('../configs/db')

module.exports={
    getJob: function(){
        return new Promise(function(resolve,reject){
            conn.query('SELECT * FROM view_data',function(err,result){
                if (!err) {
                    resolve(result)
                  } else {
                    reject(new Error(err))
                  }
            })
        })
    }
}