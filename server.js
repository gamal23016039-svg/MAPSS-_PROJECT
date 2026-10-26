/**
 * - HTTP server entry point: load validated configuration, connect to MongoDB, start the
 *   Express app, and handle graceful startup/shutdown failures.
 * - Express middleware and route behavior belong in app.js and their respective modules.
 */

require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const app=express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("database run sucess")
})


app.listen(process.env.PORT,()=>{
    console.log("port run sucess")
})


