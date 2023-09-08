const User = require("../models/user");

const checkPermissions = async (user1, authUser) => {
  const user = await User.findOne({ _id: authUser });
  if (user.role === "admin" || user1 === authUser) {
    return true;
  }
  return false;
};
module.exports = { checkPermissions };
