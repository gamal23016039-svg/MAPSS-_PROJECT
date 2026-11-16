
const Staff = require("./staff.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const staffLoginService = async (data) => {
    const { email, password } = data;

    const staff = await Staff.findOne({
        email: email.toLowerCase().trim()
    });

    if (!staff) {
        throw new AppError("Invalid email or password", 401);
    }

    if (!staff.isActive) {
        throw new AppError("Your account is disabled", 403);
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        staff.password
    );

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
        {
            id: staff._id,
            role: staff.role
        },
        process.env.secretkey,
        { expiresIn: "30m" }
    );

    return {
        message: `Welcome ${staff.firstName}`,
        token
    };
};

module.exports = { staffLoginService };
