
const {
  createDoctorService,
  getDoctorsService,
  updateDoctorService
} = require("./doctor.service");
 
const createDoctor = async (req, res, next) => {
  try {
    const doctor = await createDoctorService(req.body);

    return res.status(201).json({
      status: "success",
      message: "Doctor created successfully",
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await getDoctorsService();

    return res.status(200).json({
      status: "success",
      results: doctors.length,
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await updateDoctorService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      status: "success",
      message: "Doctor updated successfully",
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  updateDoctor
};
