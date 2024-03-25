const { Product } = require("../models/product");

exports.get_products = async (req, res, next) => {
  let { page = 0, limit = 10, name = "" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let offset = page * limit;
  let criteria = {};
  if (name) criteria.name = { $regex: name, $options: "i" };
  try {
    const response = await Product.find(criteria)
      .limit(limit * 1)
      .skip(offset)
      .exec();
    const count = await Product.find({}).countDocuments();

    res.status(200).send({
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

exports.get_product_by_id = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const response = await Product.findOne({ _id: product_id });
    if (!response) throw new Error("Product not found.");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.create_product = async (req, res, next) => {
  const product = req.body;
  try {
    const response = await Product.create(product);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.update_product = async (req, res, next) => {
  const { product_id } = req.params;
  const product = req.body;
  try {
    const response = await Product.findOneAndUpdate(
      { _id: product_id },
      product
    );
    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_product = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const response = await Product.findOneAndDelete({ _id: product_id });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
