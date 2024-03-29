const router = require("express").Router();
const { review_controller } = require("../controllers");

router
  .route("/")
  .get(review_controller.get_reviews)
  .post(review_controller.create_review);

router
  .route("/:review_id")
  .get(review_controller.get_review_by_id)
  .put(review_controller.update_review)
  .delete(review_controller.delete_review);

module.exports = router;
