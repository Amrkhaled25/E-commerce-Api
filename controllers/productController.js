const Product = require("../models/products");
const notFounderror = require("../errors/not-found");
const badRequestError = require("../errors/bad-request");
const path = require("path");
const createProduct = async (req, res) => {
  req.body.user = req.user.user.userId;
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new notFounderror("No such product exist");
  }
  res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new notFounderror("No such product exist");
  }
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ msg: "product deleted successfully" });
};

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) {
    throw new notFounderror("No such product exist");
  }
  res.status(200).json({ product });
};

const uploadImages = async (req, res) => {
  if (!req.files) {
    throw new notFounderror("please upload an image");
  }
  const productImages = req.files.image;
  for (const productImage of productImages) {
    if (!productImage.mimetype.startsWith("image")) {
      throw new badRequestError("Please Upload Image");
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
      throw new badRequestError("Please upload image smaller than 1MB");
    }

    const imagePath = path.join(
      __dirname,
      "../public/images/" + `${productImage.name}`
    );

    await productImage.mv(imagePath);
  }
  res.status(200).json({ msg: "images uploaded successfully" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImages,
};
