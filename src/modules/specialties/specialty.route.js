const express = require("express");
const Router = express.Router();
const specialtyController = require("./specialty.controller");
const { verifytoken } = require("../../middlewares/jwt.middleware");
const { allowTo } = require("../../middlewares/allowto");
Router.post(
  "/",
  verifytoken,
  allowTo("Admin"),
  specialtyController.createSpecialty
);


Router.get(
  "/",
  verifytoken,
  allowTo("Admin"),
  specialtyController.getSpecialties
);


Router.patch(
  "/:id",
  verifytoken,
  allowTo("Admin"),
  specialtyController.updateSpecialty
);

module.exports = Router;