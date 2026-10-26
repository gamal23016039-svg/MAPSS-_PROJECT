const AppError = require("../utils/AppError");
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      msg: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: "error",
    msg: "Internal server error",
  });
};

module.exports = errorHandler;