const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to ecommerce app" });
});

router.use("/users", require("./user.routes"));
router.use("/products", require("./product.routes"));
router.use("/cart", require("./cart.routes"));
router.use("/reviews", require("./review.routes"));
router.use("/orders", require("./order.routes"));
router.use("/address", require("./address.routes"));


module.exports = router;
