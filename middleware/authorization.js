const customError = require("../errors/bad-request");

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user.role)) {
      throw new customError("unauthorized to access this route");
    }
    next();
  };
};
module.exports = {
  authorizePermissions,
};
