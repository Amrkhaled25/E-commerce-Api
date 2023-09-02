const User = require("../models/user");
const notFounderror = require("../errors/not-found");
const badRequestError = require("../errors/bad-request");
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(200).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new notFounderror(`no user with id ${req.params.id} exist`);
  }
  // if(req.user.role === 'admin')
  res.status(200).json({ user });
};

const updateUser = async (req, res) => {
  // console.log("hi");
  const { email, name } = req.body;
  if (!email || !name) {
    throw new badRequestError("please fill all fields");
  }

  const user = await User.findOne({ _id: req.user.user.userId });
  user.email = email;
  user.name = name;
  res.status(200).json({ user });
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new badRequestError("please fill all fields");
  }

  const user = await User.findOne({ _id: req.user.user.userId });
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw new badRequestError("please enter the correct old password");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({ msg: "password updated successfully" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  updatePassword,
};
