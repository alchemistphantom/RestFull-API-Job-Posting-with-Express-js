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
    },
    addCompany: function(data){
        return new Promise(function(resolve,reject){
            conn.query('INSERT INTO tb_company SET ?',data,function(err,result){
                if (!err) {
                    resolve(result)
                  } else {
                    reject(new Error(err))
                  }
            })
        })
    }

}