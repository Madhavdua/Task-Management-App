const jwt = require('jsonwebtoken');
const express=require('express');
require("dotenv").config();
const JWT_Sec_key = process.env.USER_KEY;

const fetchUser=(req,res,next)=>{
    let token =req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data =jwt.verify(token,JWT_Sec_key);
        // res.send(data);==> user object containeing id (which we have set in login route)
        req.user=data.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({error:"Error in authentication"})
    }
}
module.exports=fetchUser;