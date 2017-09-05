const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    pin_code:{
        type: Number,
        required: true
    },
    is_admin:{
        type:Boolean,
        required: true
    }
});


const User = module.exports = mongoose.model('users', userSchema);

//Create 
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err
            newUser.password = hash;
            newUser.save(callback);
        })
    })
    
}


//Read
module.exports.getUsers = function (callback) {
    User.find({},callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = {email:email}
    User.findOne(query, callback);
}


//Delete
module.exports.deleteUser = function(id, callback){
    User.findByIdAndRemove(id,callback);
}

//Comparing Password

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    });
}


