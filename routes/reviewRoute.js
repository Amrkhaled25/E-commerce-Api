const {
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

router.route("/").post(authenticateUser, createReview);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

module.exports = router;
