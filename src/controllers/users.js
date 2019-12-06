/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
require("dotenv/config");
const AuthModels = require("../models/users");
const utils = require("../helper/utils");
const uuid = require("uuid/v4");
const jwt = require("jsonwebtoken");
const validator = require("validator");

module.exports = {
  Register: function(req, res) {
    const id = uuid();
    const { email, username, password } = req.body;
    console.log(utils.checkValidEmail(email));
    const arr = { email, username, password };
    values = Object.values(arr);

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(username) ||
      validator.isEmpty(password)
    ) {
      utils.response(res, 401, true, "Please complete all field");
      return;
    }

    if (!validator.isEmail(email)) {
      utils.response(res, 200, true, "Please enter a valid email address");
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
      passwordHash
    };

    const formRegis = {
      email,
      username
    };

    AuthModels.VerifyEmail(email)
      .then(result => {
        if (result.length == 0) {
          AuthModels.Register(data)
            .then(result => {
              res.json({
                status: 201,
                message: "success Registration new user",
                formRegis
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          utils.response(res, 200, true, " account already exist");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  Login: function(req, res) {
    const { email, password } = req.body;
    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      utils.response(res, 400, true, "Please complete all field");
      return;
    }
    if (!validator.isEmail(email)) {
      utils.response(res, 400, true, "Please enter a valid email address");
      return;
    }
    //  password = decrypt(password)
    AuthModels.VerifyEmail(email)
      .then(result => {
        if (result.length > 0) {
          const user = {
            id: result[0].id,
            email: result[0].email
          };
          const salt = result[0].salt;
          const passDb = result[0].passwordHash;
          const passwordHash = utils.setPassword(password, salt);
          const check = utils.comparingPassword(
            passDb,
            passwordHash.passwordHash
          );
          console.log(passDb);
          console.log(passwordHash.passwordHash);
          console.log(check);
          // const pass = decrypt(result[0].password);
          AuthModels.Login(email)
            .then(() => {
              if (check == true) {
                const token = jwt.sign(user, process.env.JWT_KEY, {
                  expiresIn: 60 * 60
                });
                res.json({
                  status: 200,
                  message: "success login",
                  user,
                  token
                });
              } else res.json("Passwords did not match");
            })
            .catch(err => {
              console.log(err);
            });
        } else res.json("Email Not Registered");
      })
      .catch(err => {
        console.log(err);
      });
  },
  getUser: function(req, res) {
    AuthModels.getUser()
      .then(result => {
        res.json({
          success: true,
          error_code: 200,
          count: result.length,
          message: "Successfully get user data",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  getSingleData: function(req, res) {
    const email = req.params.id;
    console.log(email);
    AuthModels.VerifyEmail(email)
      .then(result => {
        res.json({
          success: true,
          error_code: 200,
          message: "Successfully get user data",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
