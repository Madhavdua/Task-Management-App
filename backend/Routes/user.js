const express=require("express");
const router=express.Router();

const User=require("../Schema/UserSchema")
require("dotenv").config();
const JWT_Sec_key = process.env.USER_KEY;
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");
const { check, validationResult } = require('express-validator');

router.post('/createUser',
    check('name').isLength({min:4}),    
    check('mail').isEmail(),    
    check('password').isLength({min:6}).withMessage('Password Must Be at Least 6 Characters'),    
    async (req,res)=>{
        let success=false;
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({success:success, error:"Please enter valid details"})
        }
        try {
            let user= await User.findOne({mail:req.body.mail})
            if(user){
                return res.status(400).json({success:success, error:"User already exist"})
            }

            const salt=await bcrypt.genSalt(10)
            const hashedPass= await bcrypt.hash(req.body.password,salt);

            user=await User.create({
                name:req.body.name,
                password:hashedPass,
                mail:req.body.mail
            })
            const data = {
                user: {
                    id: user._id
                }
            }
            const authToken = jwt.sign(data, JWT_Sec_key);
            success=true;
            res.json({success,authToken});
        } catch (error) {
            console.log(error.message);
            res.status(500).send({success:success, error:"Some error occured"});
        }
    }
    )

// creating a login endpoint
router.post('/login',
    check('password').isLength({ min: 6 }),
    check('mail').isEmail(),
    async (req, res) => {
        let success=false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ success:success, error:" Invalid credentials"})
        }
        const { password, mail } = req.body;
        try {
            const user = await User.findOne({ mail })
            if (!user) {
                return res.status(404).json({ success:success, error: "No user found" })
            }
            const compPass = await bcrypt.compare(password, user.password);
            if (!compPass) {
                return res.status(500).json({ success:success, error: "Please enter valid user credentials" })
            }
            const data = {
                user: {
                    id: user._id
                }
            }
            const authToken = await jwt.sign(data, JWT_Sec_key);
            success=true;
            res.json({success,authToken});
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send({success:success, error:"Internal server error"});
        }
    })

module.exports=router