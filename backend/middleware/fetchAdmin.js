const jwt=require("jsonwebtoken");
const JWT_Sec_key="IamAdmin";

const fetchAdmin=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data= await jwt.verify(token,JWT_Sec_key);
        req.user=data.user;
        next();

    } catch (error) {
        console.log(error)
        res.status(401).send({error:"Error in authentication"})
    }
}
module.exports=fetchAdmin