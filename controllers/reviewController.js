const Reviews = require("../models/reviews");
const Products = require("../models/products");
const notFounderror = require("../errors/not-found");
const badRequestError = require("../errors/bad-request");
const { checkPermissions } = require("../utils/checkPermissions");
const createReview = async (req, res) => {
  const title = req.body.title;
  const comment = req.body.comment;
  if (!title && comment) {
    throw new badRequestError("please add a title");
  }
  const Review = await Reviews.findOne({
    product: req.body.product,
    user: req.user.user.userId,
  });
  if (Review) {
    throw new badRequestError("this review already submitted");
  }
  const isValidProduct = await Products.findOne({ _id: req.body.product });
  if (!isValidProduct) {
    throw new badRequestError("please enter valid product id");
  }
  req.body.user = req.user.user.userId;
  const review = await Reviews.create(req.body);
  res.status(201).json({ review });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Reviews.findOne({ _id: reviewId });
  if (!review) {
    throw new notFounderror("no such review found");
  }
  res.status(200).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Reviews.findOne({ _id: reviewId });
  if (!review) {
    throw new notFounderror("no such review found");
  }
  const { title, comment, rating } = req.body;
  const authorisedUser = await checkPermissions(
    review.user.toString(),
    req.user.user.userId
  );

  if (!authorisedUser) {
    throw new badRequestError("unauthorized to access this route");
  }
  review.title = title;
  review.comment = comment;
  review.rating = rating;
  await review.save();
  res.status(200).json({ review });
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Reviews.findOne({ _id: reviewId });
  if (!review) {
    throw new notFounderror("no such review found");
  }
  const authorisedUser = await checkPermissions(
    review.user.toString(),
    req.user.user.userId
  );
  if (!authorisedUser) {
    throw new badRequestError("unauthorized to access this route");
  }

  await Reviews.deleteOne({ _id: reviewId });
  res.status(200).json({ msg: "review deleted " });
};

const getProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const review = await Reviews.find({ product: productId });
  res.status(200).json({ review });
};

module.exports = {
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getProductReviews,
};
