const router = require("express").Router();
const { cart_controller } = require("../controllers");

router.post("/", (req, res) => {
  res.send("hello");
});

router.route("/add/:user_id").post(cart_controller.add_products);
router.route("/remove/:user_id").post(cart_controller.remove_products);

module.exports = router;
