const { Cart } = require("../models/cart");
const { Order } = require("../models/order");
const { Product } = require("../models/product");

exports.get_orders = async (req, res, next) => {
  let { page = 0, limit = 10 } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;

  let offset = page * limit;

  try {
    const response = await Order.find({}, {}, { skip: offset, limit });

    const count = await Order.find({}).countDocuments();

    return res.status(200).send({
      total: count,
      total_page: Math.ceil(count / limit),
      current_page: page,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.get_order_by_id = async (req, res, next) => {};

exports.create_order = async (req, res, next) => {
  const { user_id, cart_id, address_id, total_amount } = req.body;

  try {
    const user_cart = await Cart.findById(cart_id);
    console.log(user_cart);

    await user_cart.products.map(async (product_obj) => {
      const product = await Product.findOne({ _id: product_obj.product });
      product.stock = product.stock - product_obj.quantity;
      await product.save();
    });

    const response = await Order.create({
      user_id: user_id,
      cart: cart_id,
      destination: address_id,
      total_amount: total_amount,
    });
    return res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.update_order = async (req, res, next) => {};

exports.delete_order = async (req, res, next) => {};
