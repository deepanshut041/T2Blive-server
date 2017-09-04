const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

const adminSchema = mongoose.Schema({
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
    }
});


const Admin = module.exports = mongoose.model('admin', adminSchema);

//Create 
module.exports.addAdmin = function(newAdmin, callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newAdmin.password, salt, (err, hash)=>{
            if(err) throw err
            newAdmin.password = hash;
            newAdmin.save(callback);
        })
    })
    
}


//Read
module.exports.getAdmins = function (callback) {
    Admin.find({},callback);
}

module.exports.getAdminById = function (id, callback) {
    Admin.findById(id, callback);
}

module.exports.getAdminByEmail = function(email, callback){
    const query = {email:email}
    Admin.findOne(query, callback);
}


//Delete
module.exports.deleteAdmin = function(id, callback){
    Admin.findByIdAndRemove(id,callback);
}

//Comparing Password

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    });
}

