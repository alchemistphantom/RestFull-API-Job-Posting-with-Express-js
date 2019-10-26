/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
require('dotenv/config');
const AuthModels = require('../models/users');
const utils = require('../helper/utils');
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');

module.exports = {
  Register: function(req, res) {
    const id = uuid();
    const {email, username, password} = req.body;
    console.log(email);
    console.log(utils.checkValidEmail(email));
    if (!utils.checkValidEmail(email)) {
      res.json('email tidak valid');
      return;
    }

    const salt = utils.generateSalt(32);
    const pass = utils.setPassword(password, salt);
    const passwordHash = pass.passwordHash;
    const data = {
      id,
      email,
      username,
      salt,
      passwordHash,
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
              const salt = result[0].salt;
              const passDb = result[0].passwordHash;
              const passwordHash = utils.setPassword(password, salt);
              const check = utils.comparingPassword(passDb, passwordHash.passwordHash);
              console.log(passDb);
              console.log(passwordHash.passwordHash);
              console.log(check);
              // const pass = decrypt(result[0].password);
              AuthModels.Login(email)
                  .then(() => {
                    if (check==true) {
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
    } else {
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
