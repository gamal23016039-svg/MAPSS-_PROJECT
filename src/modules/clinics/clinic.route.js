/**
 * - Clinics module routes: define clinic management/retrieval methods and paths, then apply
 *   JWT authentication, required staff/admin authorization, request validation, and
 *   controller handlers.
 */

const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validation.middleware");

const controller = require("./clinic.controller");
const schemas = require("./clinic.validation");

router.use(protect);

router.get("/", validate(schemas.listQuery, "query"), controller.getClinics);
router.get("/:id", validate(schemas.idParams, "params"), controller.getClinicById);

router.post(
  "/",
  authorize("admin"),
  validate(schemas.createBody), 
  controller.createClinic
);

router.patch(
  "/:id",
  authorize("admin"),
  validate(schemas.idParams, "params"),
  validate(schemas.updateBody),
  controller.updateClinic
);

router.patch(
  "/:id/status",
  authorize("admin"),
  validate(schemas.idParams, "params"),
  validate(schemas.statusBody),
  controller.setClinicStatus
);

module.exports = router;