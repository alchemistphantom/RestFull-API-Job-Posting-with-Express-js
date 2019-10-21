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
    },
    addJob: function(data){
        return new Promise(function(resolve,reject){
            conn.query('INSERT INTO tb_job SET ?',data,function(err,result){
                if (!err) {
                    resolve(result)
                  } else {
                    reject(new Error(err))
                  }
            })
        })
    }
}