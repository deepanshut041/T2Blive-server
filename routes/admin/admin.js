const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const config = require('../../config/database');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next)=>{
    User.getUsers((err, post)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(post);
        }
    })
});

router.post('/',(req, res, next)=>{
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone_no: req.body.phone_no,
        profile_pic: req.body.profile_pic,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pin_code: req.body.pin_code,
        is_admin: true
    });

    User.addUser(newUser, (err, post)=>{
        if (err) {
            res.json({success:false, msg:"Failed to post the post"});
            console.log(err);
        } else {
            res.json({success:true, msg:"Posted succefully"});
        }
    })
});

router.post('/login', (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    User.getUserByEmail(email, (err, user)=>{
        if(err) throw err;
        if(!user){
            res.json({success:false, msg:"User not found"});   
        }
        console.log()
        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, { expiresIn: 604800});
            
                res.json({
                    success: true,
                    token : 'JWT ' + token,
                    user:{
                        id:user._id,
                        name:user.name,
                        email:user.email,
                        admin:user.is_admin
                    }
                });
            }
            else{
                res.json({success:true, msg:"Wrong Password"});
            }

        });
    });
});


module.exports = router