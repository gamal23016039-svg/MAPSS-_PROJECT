const {registerservice}=require("./auth.service")
const {loginservice}=require("./auth.service")
const {forgetpasswordservice}=require("./auth.service")
const {verifyOTPservice}=require("./auth.service")
const {changepasswordservice}=require("./auth.service")


const register=(req,res,next)=>{
try{
const result= await registerservice(req.body)
return res.status(201).json({
    status:"success",
    data:result
})
}
catch(error){
    return next(error)
}
}
const login=(req,res,next)=>{
try{
const result= await loginservice(req.body)
return res.status(200).json({
    status:"success",
    data:result
})
}
catch(error){
    return next(error)
}
}
const forgetpassword=async(req,res,next)=>{
try{
const result= await forgetpasswordservice(req.body)
return res.status(200).json({
    status:"success",
    data:result
})
}
catch(error){
    return next(error)
}
}
const verifyOTP=async(req,res,next)=>{
try{
const result= await verifyOTPservice(req.body)
return res.status(200).json({
    status:"success",
    data:result
})
}
catch(error){
    return next(error)
}
}
const changepassword=async(req,res,next)=>{
try{
const result= await changepasswordservice(req.body)
return res.status(200).json({
    status:"success",
    data:result
})
}
catch(error){
    return next(error)
}
}
module.exports={
    register,login,verifyOTP,forgetpassword,changepassword
}