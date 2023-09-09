const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  getAllOrders,
  getUserOrders,
} = require("../controllers/orderController");
const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, getAllOrders);
router.route("/showAllMyOrders").get(authenticateUser, getUserOrders);
router.route("/:id").get(authenticateUser, getOrder);

module.exports = router;
