const conn = require('../configs/db').default
module.exports={
    Register: function(data){
        return new Promise(function(resolve,reject){
            conn.query('INSERT INTO tb_user SET ?',data,function(err,result){
                if (!err) {
                    resolve(result)
                  } else {
                    reject(new Error(err))
                  }
            })
        })
    },
    Login: function(username,password){
        return new Promise(function(resolve,reject){
            conn.query('SELECT * FROM tb_user WHERE email = ? AND password= ?',[username,password],function(err,result){
                if (!err) {
                    resolve(result)
                  } else {
                    reject(new Error(err))
                  }
            })
        })
    },
    
    VerifyEmail: function(email){
        return new Promise(function(resolve,reject){
            conn.query('SELECT * FROM tb_user WHERE email = ? ',email,function(err,result){
                if (!err) {
                    resolve(result)
                    //result.password;
                  } else {
                    reject(new Error(err))
                  }
            })
        })
    },

    getUser: function(email,password){
        return new Promise(function(resolve,reject){
            conn.query('SELECT * FROM tb_user WHERE email = ? AND password= ?',[email,password],function(err,result){
                if (!err) {
                    resolve(result)
                  
                  } else {
                    reject(new Error(err))
                  }
            })
        })
    }
}