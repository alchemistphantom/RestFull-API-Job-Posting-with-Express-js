require('dotenv/config')
const AuthModels = require('../models/Auth')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';
const iv = Buffer.alloc(16, 0); // Initialization vector.
function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password,iv)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
   
  function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password,iv)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
   
module.exports = {  
    getAuth: function(req,res){
        AuthModels.getAuth()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    Register: function(req,res){
        const id = uuid()
        let {email,username,password} = req.body
         password = encrypt(password)
        console.log(decrypt(password));
        const data = {
            id,
            email,
            username,
            password
        }
        AuthModels.VerifyEmail(email)
        .then(result => {
            if(result.length==0){
                AuthModels.Register(data)
                .then(result => {
                    res.json(result)
                  })
                  .catch(err => {
                    console.log(err)
                  })
            }else console.log('Data already exist!')
          })
          .catch(err => {
            console.log(err)
          })
        
        },
        Login: function(req,res){
            let {email,password} = req.body
            //  password = decrypt(password)          
            AuthModels.VerifyEmail(email)
            .then(result => {
                if(result.length>0){
                  const user ={
                    id  : result[0].id,
                    email : result[0].email
                  }
                    var pass = decrypt(result[0].password);
                    AuthModels.Login(email)
                    .then(result => {
                        if(pass==password){
                          const token = jwt.sign(user,process.env.JWT_KEY, { expiresIn: '1h' })
                          res.json({user,token})
                
                        }else res.json('Passwords did not match')
                      })
                      .catch(err => {
                        console.log(err)
                      })
                }else res.json('Email Not Registered')
              })
              .catch(err => {
                console.log(err)
              })
            }
        }