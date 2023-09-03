const Product = require("../models/products");
const notFounderror = require("../errors/not-found");
const badRequestError = require("../errors/bad-request");

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
  res.send("upload images product controller");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImages,
};
