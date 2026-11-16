const AppError = require("../../utils/AppError")
const Patients=require("./auth.model")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
const sendEmail=require('../../middlewares/email')
const registerservice=async(data)=>{
const {FirstName,LastName,nationalId,phone,email,password,confirmpassword}=data
const checknationalId = await Patients.findOne({nationalId}) 
if(checknationalId){
    throw new AppError ("this nationalId is exit already")
}
const checkphone = await Patients.findOne({phone}) 
if(checkphone){
    throw new AppError ("this phone is used before")
}
const checkemail = await Patients.findOne({email}) 
if(checkemail){
    throw new AppError ("this email is used before")
}
if(confirmpassword !== password){
    throw new AppError ("confirm password not equal password ")
}
const role ="patient"
const passwordHash = await bcrypt.hash(password,10)
const newpatient= new Patients({
    FirstName,LastName,nationalId,phone,email,password:passwordHash,role
})
await newpatient.save()
  return {
    message: "Registration successful.",
  };
}
const loginservice=async(data)=>{
const {email,password}=data
const checkemail=await Patients.findOne({email})
if(!checkemail){
    throw new AppError("Invalid email or password",404) 
}
const checkpassword = await bcrypt.compare(password,checkemail.password)
if(!checkpassword){
    throw new AppError("Invalid email or password",404) 
}
const token =jwt.sign({id:checkphone._id,role:checkphone.role},process.env.secretkey,{expiresIn:'30m'})
  return {
    message: `Welcome ${checkPhone.name}`
    ,token
    
  };
}
const forgetpasswordservice=async(data)=>{
const{email}=data
const finduser=await Patients.findOne({email})
if(!finduser){
        throw new AppError('this users not found ',404)
    }
const userotp = crypto.randomInt(100000, 999999).toString(); 
const hashotp=await bcrypt.hash(userotp,10)
await sendEmail({
to: email,
subject: "reset your password",
html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>Welcome, ${finduser.name} 👋</h2>

    <p>Use the verification code below to reset your password on <strong>EDU</strong>.</p>

    <div style="
      background-color: #f4f4f4;
      padding: 15px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 5px;
      border-radius: 8px;
      margin: 20px 0;
    ">
      ${userotp}
    </div>

    <p>This code will expire in <strong>5 minutes</strong>.</p>

    <p>If you didn't request this code, you can safely ignore this email.</p>

    <hr style="margin: 20px 0;" />

    <p>Thank you for choosing EDUSITE.</p>
  </div>
`
});
finduser.expiredate=Date.now()+5*60*1000
finduser.hashOTP=hashotp
finduser.isOTPverified=false
await finduser.save()
return {
    message:`the OTP send successfully please check your email`
}
}
const verifyOTPservice=async(data)=>{
const {otp,phone} =data
const finduser= await Patients.findOne({phone})
if(!finduser){
    throw new AppError("not found user ",404)
}
const checkOTP=await bcrypt.compare(otp,finduser.hashOTP)
if(!checkOTP){
    throw new AppError("otp is wrong ",404)
}
if(Date.now() > finduser.expiredate ){
throw new AppError("otp is expired ",404)}
finduser.isOTPverified=true
await finduser.save()
return{
    message:`otp is correct`
}
}
const changepasswordservice=async(data)=>{
const {newpassword,phone}=data
const finduser=await Patients.findOne({phone})
if(!finduser){
    throw new AppError("not found user ",404)
}
if(finduser.isOTPverified == false){
    throw new AppError("not verified otp",404)
}
const hashnewpassword=await bcrypt.hash(newpassword,10)
finduser.password=hashnewpassword
finduser.isOTPverified=false
finduser.hashOTP=undefined
finduser.expiredate=undefined
await finduser.save()
return{
    message:`password changed`
}
}
module.exports={
    registerservice,loginservice,forgetpasswordservice,verifyOTPservice,changepasswordservice
}

