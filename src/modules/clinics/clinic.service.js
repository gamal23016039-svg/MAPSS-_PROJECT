/**
 * - Clinics module service: create, update, activate, deactivate, and retrieve hospital
 *   clinics; coordinate related doctor/shift constraints as needed.
 * - Keep HTTP formatting in controllers and authorization in route middleware.
 */

const Clinic = require("./clinic.model");
const Specialty = require("../specialties/specialty.model");
const AppError = require("../../utils/ApiError");
const { assertValidId } = require("../../utils/objectId");
const { escapeRegex } = require("../../utils/regex");

const NAME_COLLATION = { locale: "en", strength: 2 };
const POPULATE_SPECIALTIES = { path: "specialtyIds", select: "name" };

const normalizeName = (name) => {
  if (typeof name !== "string" || !name.trim()) {
    throw new AppError("Clinic name is required", 400);
  }
  return name.trim();
};

const normalizeSpecialtyIds = async (specialtyIds) => {
  if (!Array.isArray(specialtyIds) || specialtyIds.length === 0) {
    throw new AppError("At least one specialty is required", 400);
  }
  specialtyIds.forEach((id) => assertValidId(id, "specialty id"));

  const uniqueIds = [...new Set(specialtyIds.map(String))];
  const found = await Specialty.countDocuments({ _id: { $in: uniqueIds } });
  if (found !== uniqueIds.length) {
    throw new AppError("One or more specialties do not exist", 400);
  }
  return uniqueIds;
};

const assertNameAvailable = async (name, excludeId) => {
  const filter = { name };
  if (excludeId) filter._id = { $ne: excludeId };
  const exists = await Clinic.exists(filter).collation(NAME_COLLATION);
  if (exists) {
    throw new AppError("A clinic with this name already exists", 409);
  }
};

const rethrowDuplicate = (err) => {
  if (err && err.code === 11000) {
    throw new AppError("A clinic with this name already exists", 409);
  }
  throw err;
};


const createClinic = async ({ name, specialtyIds }) => {
  const cleanName = normalizeName(name);
  const cleanSpecialtyIds = await normalizeSpecialtyIds(specialtyIds);
  await assertNameAvailable(cleanName);

  let clinic;
  try {
    clinic = await Clinic.create({ name: cleanName, specialtyIds: cleanSpecialtyIds });
  } catch (err) {
    rethrowDuplicate(err);
  }
  await clinic.populate(POPULATE_SPECIALTIES);
  return clinic;
};

const getClinics = async (query = {}, { includeInactive = false } = {}) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1), 100);

  const filter = {};

  if (typeof query.q === "string" && query.q.trim()) {
    filter.name = { $regex: escapeRegex(query.q.trim()), $options: "i" };
  }

  if (query.specialtyId) {
    assertValidId(query.specialtyId, "specialtyId");
    filter.specialtyIds = query.specialtyId; 
  }

  if (includeInactive) {
    if (query.isActive === "true" || query.isActive === true) filter.isActive = true;
    if (query.isActive === "false" || query.isActive === false) filter.isActive = false;
  } else {
    filter.isActive = true; 
  }

  const [clinics, total] = await Promise.all([
    Clinic.find(filter)
      .populate(POPULATE_SPECIALTIES)
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Clinic.countDocuments(filter),
  ]);

  return {
    data: clinics,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getClinicById = async (id, { includeInactive = false } = {}) => {
  assertValidId(id, "clinic id");

  const clinic = await Clinic.findById(id).populate(POPULATE_SPECIALTIES).lean();
  if (!clinic || (!clinic.isActive && !includeInactive)) {
    throw new AppError("Clinic not found", 404);
  }
  return clinic;
};

const updateClinic = async (id, { name, specialtyIds } = {}) => {
  assertValidId(id, "clinic id");

  if (name === undefined && specialtyIds === undefined) {
    throw new AppError("Provide at least one field to update (name or specialtyIds)", 400);
  }

  const clinic = await Clinic.findById(id);
  if (!clinic) throw new AppError("Clinic not found", 404);

  if (name !== undefined) {
    const cleanName = normalizeName(name);
    await assertNameAvailable(cleanName, clinic._id);
    clinic.name = cleanName;
  }

  if (specialtyIds !== undefined) {
    clinic.specialtyIds = await normalizeSpecialtyIds(specialtyIds);
  }

  try {
    await clinic.save();
  } catch (err) {
    rethrowDuplicate(err);
  }
  await clinic.populate(POPULATE_SPECIALTIES);
  return clinic;
};

const setClinicStatus = async (id, isActive) => {
  assertValidId(id, "clinic id");

  if (typeof isActive !== "boolean") {
    throw new AppError("isActive must be a boolean", 400);
  }

  const clinic = await Clinic.findById(id);
  if (!clinic) throw new AppError("Clinic not found", 404);

  if (clinic.isActive !== isActive) {
    clinic.isActive = isActive;
    await clinic.save();
  }
  await clinic.populate(POPULATE_SPECIALTIES);
  return clinic;
};

module.exports = {
  createClinic,
  getClinics,
  getClinicById,
  updateClinic,
  setClinicStatus,
};