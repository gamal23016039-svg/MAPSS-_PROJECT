const jwt =require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
const verifytoken=async (req,res,next)=>{
const auth= req.headers.authorization
if(!auth){
   return res.json({state:"fail",msg:"authorization is required"})
}
const token = await auth.split(' ')[1]
try{
const decode = jwt.verify(token,env.SecretKey)
req.user=decode
 return next()
}
catch(error){
     res.json({state:"fail",msg:"token is wrong or expired"})
}
}
module.exports={verifytoken}