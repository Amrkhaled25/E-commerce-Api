const notFounderror = require("../errors/not-found");
const badRequestError = require("../errors/bad-request");
const { checkPermissions } = require("../utils/checkPermissions");
const Orders = require("../models/orders");
const Products = require("../models/products");
const createOrder = async (req, res) => {
  let { orderItems } = req.body;
  if (!orderItems) {
    throw new badRequestError("no items are found in cart");
  }
  let Total = 0;
  let cartItems = [];

  for (const item of orderItems) {
    const productId = item.product;
    const orderedProduct = await Products.findOne({ _id: productId });
    if (!orderedProduct) {
      throw new notFounderror("this product does not exist");
    }
    const { name, price, images, _id } = orderedProduct;
    let image = "img.png";
    if (images.length > 0) {
      image = images[0];
    }
    const singleCartItem = {
      name,
      price,
      image,
      product: _id,
      quantity: item.quantity,
    };

    cartItems = [...cartItems, singleCartItem];
    Total += price * item.quantity;
  }
  const subTotal = Total;
  Total += req.body.tax;
  Total += req.body.delivery;
  const { tax, delivery } = req.body;
  orderItems = cartItems;
  const order = await Orders.create({
    orderItems,
    subTotal,
    total: Total,
    tax,
    delivery,
    user: req.user.user.userId,
  });
  req.amount = Total * 100;
  res.status(201).json(order);
};

module.exports = {
  createOrder,
};
