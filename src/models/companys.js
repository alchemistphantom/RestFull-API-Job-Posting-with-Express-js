const conn = require('../configs/db')

module.exports={
    getCompany: function(){
        return new Promise(function(resolve,reject){
            conn.query('SELECT * FROM tb_company',function(err,result){
                if (!err) {
                    resolve(result)
                  } else {
                    reject(new Error(err))
                  }
            })
        })
    }
}