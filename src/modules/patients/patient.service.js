const Patients = require("../auth/auth.model");
const AppError = require("../utils/AppError");

const getMyProfileService = async (userId) => {
    const patient = await Patients.findById(userId)
        .select("-password -hashOTP -expiredate -isOTPverified");

    if (!patient) {
        throw new AppError("Patient not found", 404);
    }
    return patient;
};
const updateMyProfileService = async (userId, data) => {
    const patient = await Patients.findByIdAndUpdate(
        userId,
        { $set: {...data} },
        {
            new: true,
            runValidators: true
        }
    ).select("-password -hashOTP -expiredate -isOTPverified");

    if (!patient) {
        throw new AppError("Patient not found", 404);
    }

    return patient;
};

const searchPatientsService = async (query) => {
    if (!query || query.trim().length < 3) {
        throw new AppError(
            "Search query must be at least 3 characters",
            400
        );
    }
    const search = query.trim();
    const patients = await Patients.find({
        $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { nationalId: { $regex: search, $options: "i" } }
        ]
    })
    .select("-password -hashOTP -expiredate -isOTPverified")
    .limit(20);

    return patients;
};

module.exports = {
    getMyProfileService,
    updateMyProfileService,
    searchPatientsService
};
