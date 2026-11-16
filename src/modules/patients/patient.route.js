
const express = require("express");
const Router = express.Router();

const patientController = require("../controllers/patient.controller");
const { verifytoken } = require("../../middlewares/jwt.middleware");

Router.get(
    "/me",
    verifytoken,
    patientController.getMyProfile
);

Router.patch(
    "/me",
    verifytoken,
    patientController.updateMyProfile
);


Router.get(
    "/search",
    verifytoken,
    patientController.searchPatients
);

module.exports = Router;
