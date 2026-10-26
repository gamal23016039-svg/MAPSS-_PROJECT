const AppError = require("../../utils/AppError")
const Patients=require("./auth.model")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")

const registerservice=async(data)=>{
const {name,nationalId,phone,email,password,confirmpassword}=data

const checknationalId = await Patients.findOne({nationalId}) 

if(checknationalId){
    throw new AppError ("this nationalId is exit already")
}
const checkphone = await Patients.findOne({phone}) 
if(checkphone){
    throw new AppError ("this phone is sign up before")
}
const checkemail = await Patients.findOne({email}) 
if(checkemail){
    throw new AppError ("this email is sign up before")
}
if(confirmpassword !== password){
    throw new AppError ("confirm password not equal password ")
}
const role ="patient"
const passwordHash = await bcrypt.hash(password,10)
const newpatient= new Patients({
    name,nationalId,phone,email,password:passwordHash,role
})
await newpatient.save()
  return {
    message: "Registration successful.",
  };
}
const loginservice=async(data)=>{
const {phone,password}=data
const checkphone=await Patients.findOne({phone})
if(!checkphone){
    throw new AppError("Invalid phone or password",404) 
}
const checkpassword = await bcrypt.compare(password,checkphone.password)
if(!checkpassword){
    throw new AppError("Invalid phone or password",401) 
}
const token =jwt.sign({id:checkphone._id,role:checkphone.role},process.env.secretkey,{expiresIn:'30m'})
  return {
    message: `Welcome ${checkPhone.name}`
    ,token
    
  };
}