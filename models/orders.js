const mongoose = require("mongoose");

const orderItemsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "products",
    require: [true, "please add product id"],
  },
});

const orderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      default: 0,
    },
    delivery: {
      type: Number,
      default: 0,
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    orderItems: [orderItemsSchema],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      require: [true, "please add user id"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    collection: "orders",
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
