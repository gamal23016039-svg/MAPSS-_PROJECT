//3
const Joi = require("joi")
const registerSchema=Joi.object({
    firstName:Joi.string().required()
    ,lastName:Joi.string().required()
    ,nationalId:Joi.string().required().min(14).max(14).length(14)
    ,phone:Joi.string().required().min(11).max(11)
    ,email: Joi.string().email().required()
    ,password: Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base":
      "Password must contain uppercase, lowercase and number",
    "string.empty": "Password is required"
  })
,
 confirmPassword: Joi.string().required()
})
const loginSchema=Joi.object({
    email: Joi.string().email().required()
    ,password: Joi.string()
  .min(8)
  .max(30)
})
const forgetpasswordSchema=Joi.object({
    email: Joi.string().email().required()
})
const verifyOTPSchema=Joi.object({
    phone: Joi.string().email().required(),
    otp: Joi.string().required()
  .max(6)
})
const changepasswordSchema=Joi.object({
  oldpassword: Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base":
      "Password must contain uppercase, lowercase and number",
    "string.empty": "Password is required"
  }),
    newpassword: Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base":
      "Password must contain uppercase, lowercase and number",
    "string.empty": "Password is required"
  })
  
})


module.exports={loginSchema,registerSchema,deleteSchema,getuserSchema,resetpasswordSchema,verifyemailSchema,updateinformationSchema,changepasswordSchema,resetpassword}