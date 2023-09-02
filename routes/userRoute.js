const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updatePassword,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const { authorizePermissions } = require("../middleware/authorization");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updatePassword").patch(authenticateUser, updatePassword);
router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
