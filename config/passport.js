const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = mongoose.model('User');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
};

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        console.log("jwt payload", jwt_payload);
        //find the user specified in the token
        User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err))
    }))
};