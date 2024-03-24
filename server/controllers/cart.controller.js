const { User } = require("../models/user");

exports.add_products = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { products } = req.body;
    const user = await User.findOne({ _id: user_id });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart_items = products;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.remove_products = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { products } = req.body;
    const user = await User.findOne({ _id: user_id });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart_items = products;

    await user.save();

    res.status(200).send("add products");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
