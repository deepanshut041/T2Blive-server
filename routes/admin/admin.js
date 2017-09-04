const express = require('express');
const router = express.Router();
const Admin = require('../../models/admin/admin');
const config = require('../../config/database');

router.get('/', (req, res, next)=>{
    Admin.getAdmins((err, post)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(post);
        }
    })
});

router.post('/',(req, res, next)=>{
    let newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone_no: req.body.phone_no,
        profile_pic: req.body.profile_pic
    });

    Admin.addAdmin(newAdmin, (err, post)=>{
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
    
    Admin.getAdminByEmail(email, (err, admin)=>{
        if(err) throw err;
        if(!admin){
            res.json({success:false, msg:"User not found"});   
        }
        console.log()
        Admin.comparePassword(password, admin.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(admin, config.secret, { expiresIn: 604800});
            
                res.json({
                    success: true,
                    token : 'JWT ' + token,
                    admin:{
                        id:admin._id,
                        name:admin.name,
                        email:admin.email
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