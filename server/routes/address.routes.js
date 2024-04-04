const router = require("express").Router();
const { address_controller } = require("../controllers");

router.route("/").get(address_controller.get_addresses);

router.route("/:user_id").post(address_controller.create_address);

router
  .route("/:address_id")
  .get(address_controller.get_address_by_id)
  .put(address_controller.update_address)
  .delete(address_controller.delete_address);

module.exports = router;
