
const express = require("express");
const Router = express.Router();

const staffController = require("./staff.controller");

Router.post("/login", staffController.staffLogin);

module.exports = Router;
