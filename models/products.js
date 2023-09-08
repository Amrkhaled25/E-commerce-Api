const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name"],
      trim: true,
      maxlength: [100, "name must be less than 100 character"],
    },
    description: {
      type: String,
      required: [true, "please enter description of the product"],
      maxlength: [1000, "description must be less than 1000 character"],
    },
    price: {
      type: Number,
      required: [true, "you should enter a price to the product"],
      min: [0, "price should be more than 0"],
    },
    category: {
      type: String,
      required: [true, "you should enter category name"],
    },
    brand: {
      type: String,
    },
    color: {
      type: [String],
      required: [true, "please enter product's color "],
    },
    size: {
      type: String,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [String],
    reviewsNumber: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      res: "user",
      require: [true, "please add user who create the product"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("products", productSchema);
