
const {
    getMyProfileService,
    updateMyProfileService,
    searchPatientsService
} = require("../services/patient.service");

const getMyProfile = async (req, res, next) => {
    try {
        const result = await getMyProfileService(req.user.id);

        return res.status(200).json({
            status: "success",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

const updateMyProfile = async (req, res, next) => {
    try {
        const result = await updateMyProfileService(
            req.user.id,
            req.body
        );

        return res.status(200).json({
            status: "success",
            message: "Profile updated successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

const searchPatients = async (req, res, next) => {
    try {
        const result = await searchPatientsService(req.query.q);

        return res.status(200).json({
            status: "success",
            results: result.length,
            data: result
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,
    searchPatients
};
