const AuthModels = require('../models/Auth')
const passport    = require('passport');
const passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    AuthModels.getUser({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport