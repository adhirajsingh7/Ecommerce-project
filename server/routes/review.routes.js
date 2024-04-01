const router = require("express").Router();
const { review_controller } = require("../controllers");

router.route("/").get(review_controller.get_reviews);

router.route("/:user_id/:product_id").post(review_controller.create_review);

router
  .route("/:review_id")
  .get(review_controller.get_review_by_id)
  .delete(review_controller.delete_review)
  .put(review_controller.update_review);

module.exports = router;
