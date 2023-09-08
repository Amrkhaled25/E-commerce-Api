const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImages,
} = require("../controllers/productController");

const { getProductReviews } = require("../controllers/reviewController");

const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const { authorizePermissions } = require("../middleware/authorization");

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createProduct)
  .get(getAllProducts);

router
  .route("/uploadImages")
  .post(authenticateUser, authorizePermissions("admin"), uploadImages);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct);

router.route("/:id/reviews").get(getProductReviews);

module.exports = router;
