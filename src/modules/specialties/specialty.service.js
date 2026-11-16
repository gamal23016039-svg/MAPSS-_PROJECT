
const Specialty = require("../models/specialty.model");
const AppError = require("../utils/AppError");
const createSpecialtyService = async (data) => {
    const { name, description } = data;

    const existingSpecialty = await Specialty.findOne({
        name: name.trim()
    });

    if (existingSpecialty) {
        throw new AppError("Specialty already exists", 409);
    }

    const specialty = await Specialty.create({
        name,
        description
    });

    return specialty;
};
const getSpecialtiesService = async () => {
    const specialties = await Specialty.find();

    return specialties;
};
const updateSpecialtyService = async (id, data) => {
    const allowedFields = ["name", "description", "isActive"];
    const updateData = {};

    for (const field of allowedFields) {
        if (data[field] !== undefined) {
            updateData[field] = data[field];
        }
    }

    if (Object.keys(updateData).length === 0) {
        throw new AppError("No valid fields provided", 400);
    }

    if (updateData.name) {
        const existingSpecialty = await Specialty.findOne({
            name: updateData.name.trim(),
            _id: { $ne: id }
        });

        if (existingSpecialty) {
            throw new AppError("Specialty already exists", 409);
        }
    }

    const specialty = await Specialty.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
            new: true,
            runValidators: true
        }
    );

    if (!specialty) {
        throw new AppError("Specialty not found", 404);
    }

    return specialty;
};

module.exports = {
    createSpecialtyService,
    getSpecialtiesService,
    updateSpecialtyService
};
