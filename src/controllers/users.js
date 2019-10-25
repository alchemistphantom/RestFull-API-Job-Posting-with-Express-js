/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
require('dotenv/config');
const AuthModels = require('../models/users');
const utils = require('../helper/utils');
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';
const iv = Buffer.alloc(16, 0); // Initialization vector.
function encrypt(text) {
  const cipher = crypto.createCipher(algorithm, password, iv);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipher(algorithm, password, iv);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
  Register: function(req, res) {
    const id = uuid();
    let {email, username, password} = req.body;
    password = encrypt(password);
    console.log(decrypt(password));
    const data = {
      id,
      email,
      username,
      password,
    };
    AuthModels.VerifyEmail(email)
        .then((result) => {
          if (result.length==0) {
            AuthModels.Register(data)
                .then((result) => {
                  res.json({
                    message: 'success Registration new user',
                    result});
                })
                .catch((err) => {
                  console.log(err);
                });
          } else {
            res.json({
              message: 'user already exist!',
              result});
          }
        })
        .catch((err) => {
          console.log(err);
        });
  },
  Login: function(req, res) {
    const {email, password} = req.body;
    if (email !== undefined && password !== undefined) {
    //  password = decrypt(password)
      AuthModels.VerifyEmail(email)
          .then((result) => {
            if (result.length>0) {
              const user ={
                id: result[0].id,
                email: result[0].email,
              };
              const pass = decrypt(result[0].password);
              AuthModels.Login(email)
                  .then((result) => {
                    if (pass==password) {
                      const token = jwt.sign(user, process.env.JWT_KEY, {expiresIn: 60*60});
                      res.json({
                        message: 'success login',
                        user,
                        token});
                    } else res.json('Passwords did not match');
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            } else res.json('Email Not Registered');
          })
          .catch((err) => {
            console.log(err);
          });
    }else {
      AuthModels.getUser()
          .then((result)=>{
            utils.chekingData(res, result, ' data user is empty');
          })
          .catch((err)=>{
            res.status(400).json('failed to get data');
            console.log(err);
          });
    }
  },
};
