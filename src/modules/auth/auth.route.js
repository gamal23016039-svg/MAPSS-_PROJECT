/**
 * - Auth module routes: define registration, login, OTP recovery, and password update
 *   endpoints with methods, request validation, applicable JWT/role middleware, and
 *   controller handlers.
 * - Protected endpoints require valid JWTs.
 */
const express=require("express")
const Router= express.Router()
const authcontroller=require("./auth.controller")

Router.post("/register",authcontroller.register)
Router.post("/login",authcontroller.login)
Router.post("/forget-password",authcontroller.forgetpassword)
Router.post("/verify-Otp",authcontroller.verifyOTP)
Router.post("/change-password",authcontroller.changepassword)

module.exports = Router;