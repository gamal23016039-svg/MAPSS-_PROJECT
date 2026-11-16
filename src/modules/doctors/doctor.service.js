
const Doctor = require("./doctor.model");
const Clinic = require("../clinics/clinic.model");
const Specialty = require("../specialties/specialty.route")
const AppError = require("../utils/AppError");

const createDoctorService = async (data) => {
  const { name, clinicIds, specialtyIds } = data;

  const clinics = await Clinic.find({
    _id: { $in: clinicIds }
  });

  if (clinics.length !== clinicIds.length) {
    throw new AppError("One or more clinics not found", 404);
  }

  const specialties = await Specialty.find({
    _id: { $in: specialtyIds }
  });

  if (specialties.length !== specialtyIds.length) {
    throw new AppError("One or more specialties not found", 404);
  }

  const doctor = await Doctor.create({
    name,
    clinicIds,
    specialtyIds
  });

  return doctor;
};

const getDoctorsService = async () => {
  const doctors = await Doctor.find()
    .populate("clinicIds", "name")
    .populate("specialtyIds", "name");

  return doctors;
};

const updateDoctorService = async (id, data) => {
  const allowedFields = [
    "name",
    "clinicIds",
    "specialtyIds",
    "isActive"
  ];

  const updateData = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new AppError("No valid fields provided", 400);
  }

  if (updateData.clinicIds) {
    const clinics = await Clinic.find({
      _id: { $in: updateData.clinicIds }
    });

    if (clinics.length !== updateData.clinicIds.length) {
      throw new AppError("One or more clinics not found", 404);
    }
  }

  if (updateData.specialtyIds) {
    const specialties = await Specialty.find({
      _id: { $in: updateData.specialtyIds }
    });

    if (specialties.length !== updateData.specialtyIds.length) {
      throw new AppError("One or more specialties not found", 404);
    }
  }

  const doctor = await Doctor.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  return doctor;
};

module.exports = {
  createDoctorService,
  getDoctorsService,
  updateDoctorService
};
