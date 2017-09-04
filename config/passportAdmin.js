const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('../models/admin/admin');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = "9949043"
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        Admin.getAdminById(jwt_payload._id, (err, admin)=>{
            if(err){
                return done(err, false);
            }
            if(admin){
                return done(null, admin);
            }
            else{
                return done(null, false)            
            }
        });
    }));
}

