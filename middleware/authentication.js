const customError = require("../errors/bad-request");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new customError("invalid Authentication");
  }
  try {
    const decodedToken = isTokenValid({ token });
    req.user = decodedToken;

    next();
  } catch (error) {
    throw new customError("invalid Authentication");
  }
};

module.exports = {
  authenticateUser,
};
