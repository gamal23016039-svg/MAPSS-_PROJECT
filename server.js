
require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const app=express()
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./src/config/openapi.json");

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("database run sucess")
})

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile)
);



const specialtyRoutes = require("./specialty/specialty.routes");
app.use("/api/v1/specialties", specialtyRoutes);

const doctorRoutes = require("./doctor/doctor.routes");
app.use("/api/v1/doctors", doctorRoutes);

app.listen(process.env.PORT,()=>{
    console.log("port run sucess")
})


