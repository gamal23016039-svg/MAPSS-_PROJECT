const mongoose = require("mongoose");
const AppError = require("./ApiError");

const assertValidId = (id, label = "id") => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(`Invalid ${label}`, 400);
  }
};

module.exports = { assertValidId };