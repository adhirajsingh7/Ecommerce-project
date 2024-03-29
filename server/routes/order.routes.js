const router = require("express").Router();
const { product_controller } = require("../controllers");

router
  .route("/")
  .get(product_controller.get_products)
  .post(product_controller.create_product);

router
  .route("/:product_id")
  .get(product_controller.get_product_by_id)
  .put(product_controller.update_product)
  .delete(product_controller.delete_product);

module.exports = router;
