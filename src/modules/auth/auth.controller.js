const {registerservice}=require("./auth.service")
const {loginservice}=require("./auth.service")

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
return res.status(201).json({
    status:"success",
    data:result
})
}
catch(error){
    return next(error)
}
}