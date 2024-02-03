const User = require("../models/user");
const BadRequestError = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils/jwt");
const { createTokenUser } = require("../utils/createTokenUser");

const register = async (req, res) => {
  const { email } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new BadRequestError("This email already exist");
  }
  const isAdmin = (await User.countDocuments({})) === 0;
  if (isAdmin) req.body.role = "admin";
  else req.body.role = "user";
  const user = await User.create(req.body);
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, { user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("please enter correct mail and password");
  }
  const passwordMatch = await user.comparePassword(req.body.password);
  if (!passwordMatch) {
    throw new BadRequestError("please enter correct mail and password ");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, { user: tokenUser });
  res.status(200).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "user logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
