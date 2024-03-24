const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to ecommerce app" });
});

router.use("/users", require("./user.routes"));
router.use("/products", require("./product.routes"));
router.use("/cart", require("./cart.routes"));

module.exports = router;
