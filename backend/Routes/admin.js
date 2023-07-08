const express=require("express");
const router=express.Router();

const Admin =require("../Schema/AdminSchema")

const bcrypt = require("bcrypt");
const { check, validationResult } = require('express-validator');

const jwt=require("jsonwebtoken");
const JWT_Sec_key="IamAdmin"

router.post('/createadmin',
check("name").isLength({min:3}),
check("mail").isEmail(),
check("password").isLength({min:6}),
async(req,res)=>{
    let success=false;
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({success:success, error:"Please enter valid details"})
    }
    try {
        let admin=await Admin.findOne({admin_mail:req.body.mail})
        if(admin){
            return res.status(400).json({success:success, error:"Admin already associated with this email"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPass= await bcrypt.hash(req.body.password,salt);

        admin=await Admin.create({
            admin_name:req.body.name,
            admin_password:hashedPass,
            admin_mail:req.body.mail
        })
        const data = {
            user: {
                id: admin._id
            }
        }
        const authToken = jwt.sign(data, JWT_Sec_key);
        success=true;
        // localStorage.setItem('name',req.body.mail);
        res.json({success,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({success:success, error:"Some error occured"});
    }

})

router.post('/adminlogin',
    check('password').isLength({ min: 6 }),
    check('mail').isEmail(),
    async (req, res) => {
        let success=false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ success:success, error:" Invalid credentials"})
        }
        try {
            const admin = await Admin.findOne({admin_mail:req.body.mail })
            if (!admin) {
                return res.status(404).json({ success:success, error: "Invalid admin login" })
            }
            const compPass = await bcrypt.compare(req.body.password, admin.admin_password);
            if (!compPass) {
                return res.status(500).json({ success:success, error: "Please enter valid user credentials" })
            }
            const data = {
                user: {
                    id: admin._id
                }
            }
            const authToken = await jwt.sign(data, JWT_Sec_key);
            success=true;
            // localStorage.setItem('name',req.body.mail);
            res.json({success,authToken});
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send({success:success, error:"Internal server error"});
        }
    })

module.exports=router