const router = require("express").Router();
const { order_controller } = require("../controllers");

router
  .route("/")
  .get(order_controller.get_orders)
  .post(order_controller.create_order);

router
  .route("/:order_id")
  .get(order_controller.get_order_by_id)
  .put(order_controller.update_order)
  .delete(order_controller.delete_order);

module.exports = router;
