
const { staffLoginService } = require("./staff.service");

const staffLogin = async (req, res, next) => {
    try {
        const result = await staffLoginService(req.body);

        return res.status(200).json({
            status: "success",
            data: result
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = { staffLogin };
