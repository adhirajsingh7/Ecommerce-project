const router = require("express").Router();
const { cart_controller } = require("../controllers");

router.route("/").get(cart_controller.get_all_carts);

router.route("/:user_id").post(cart_controller.add_product);

router
  .route("/:cart_id")
  .put(cart_controller.edit_cart)
  .delete(cart_controller.empty_cart);

module.exports = router;
