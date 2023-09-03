const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImages,
} = require("../controllers/productController");

const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const { authorizePermissions } = require("../middleware/authorization");

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createProduct)
  .get(getAllProducts);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct);

module.exports = router;
