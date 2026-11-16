/**
 * - Clinics module controller: read validated clinic request data, call clinic services, and
 *   return consistent HTTP responses.
 * - Keep clinic lifecycle and relationship rules in the service layer.
 */

const asyncHandler = require("../../utils/asyncHandler");
const clinicService = require("./clinic.service");

const canSeeInactive = (req) => String(req.user?.role).toLowerCase() === "admin";

const createClinic = asyncHandler(async (req, res) => {
  const clinic = await clinicService.createClinic(req.body);

  res.status(201).json({
    success: true,
    message: "Clinic created successfully",
    data: clinic,
  });
});

const getClinics = asyncHandler(async (req, res) => {
  const { data, pagination } = await clinicService.getClinics(req.query, {
    includeInactive: canSeeInactive(req),
  });

  res.status(200).json({
    success: true,
    message: "Clinics fetched successfully",
    data,
    pagination,
  });
});

const getClinicById = asyncHandler(async (req, res) => {
  const clinic = await clinicService.getClinicById(req.params.id, {
    includeInactive: canSeeInactive(req),
  });

  res.status(200).json({
    success: true,
    message: "Clinic fetched successfully",
    data: clinic,
  });
});

const updateClinic = asyncHandler(async (req, res) => {
  const clinic = await clinicService.updateClinic(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Clinic updated successfully",
    data: clinic,
  });
});

const setClinicStatus = asyncHandler(async (req, res) => {
  const clinic = await clinicService.setClinicStatus(req.params.id, req.body.isActive);

  res.status(200).json({
    success: true,
    message: clinic.isActive ? "Clinic activated successfully" : "Clinic deactivated successfully",
    data: clinic,
  });
});

module.exports = { 
    createClinic,
    getClinics, 
    getClinicById, 
    updateClinic, 
    setClinicStatus 
};