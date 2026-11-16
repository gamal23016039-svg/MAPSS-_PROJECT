const {
  createSpecialtyService,
  getSpecialtiesService,
  updateSpecialtyService
} = require("./specialty.service");

const createSpecialty = async (req, res, next) => {
  try {
    const specialty = await createSpecialtyService(req.body);

    return res.status(201).json({
      status: "success",
      message: "Specialty created successfully",
      data: specialty
    });
  } catch (error) {
    next(error);
  }
};

const getSpecialties = async (req, res, next) => {
  try {
    const specialties = await getSpecialtiesService();

    return res.status(200).json({
      status: "success",
      results: specialties.length,
      data: specialties
    });
  } catch (error) {
    next(error);
  }
};

const updateSpecialty = async (req, res, next) => {
  try {
    const specialty = await updateSpecialtyService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      status: "success",
      message: "Specialty updated successfully",
      data: specialty
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSpecialty,
  getSpecialties,
  updateSpecialty
};