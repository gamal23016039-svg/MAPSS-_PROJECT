
const express = require("express");
const Router = express.Router();

const doctorController = require("./doctor.controller");
const { verifytoken } = require("../../middlewares/jwt.middleware");
const { allowTo } = require("../../middlewares/allowto");


Router.post(
  "/",
  verifytoken,
  allowTo("Admin"),
  doctorController.createDoctor
);

Router.get(
  "/",
  verifytoken,
   allowTo("Admin"),
  doctorController.getDoctors
);

Router.patch(
  "/:id",
  verifytoken,
   allowTo("Admin"),
  doctorController.updateDoctor
);

module.exports = Router;
