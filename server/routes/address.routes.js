const router = require("express").Router();
const { address_controller } = require("../controllers");

router
  .route("/")
  .get(address_controller.get_addresses)
  .post(address_controller.create_address);

router
  .route("/:product_id")
  .get(address_controller.get_address_by_id)
  .put(address_controller.update_address)
  .delete(address_controller.delete_address);

module.exports = router;
