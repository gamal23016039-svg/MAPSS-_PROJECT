const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifytoken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "fail",
      message: "Authorization token is required"
    });
  }

  const token = auth.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.SecretKey);

    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Token is wrong or expired"
    });
  }
};

module.exports = { verifytoken };