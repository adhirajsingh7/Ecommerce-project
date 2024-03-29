const { Review } = require("../models/review");

exports.get_reviews = async (req, res, next) => {
  let { page = 0, limit = 10, name = "" } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;

  let offset = page * limit;

  try {
    const response = await Review.find()
      .limit(limit * 1)
      .skip(offset)
      .exec();

    const count = await Review.find().countDocuments();

    return res.status(200).send({
      total: count,
      total_page: Math.ceil(count / limit),
      current_page: page,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.get_review_by_id = async (req, res, next) => {
  const { review_id } = req.params;

  try {
    const response = await Review.findOne({ _id: review_id });
    if (!response) throw new Error("Review not found.");
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.create_review = async (req, res, next) => {
  const review = req.body;

  try {
    const response = await Review.create(review);
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.update_review = async (req, res, next) => {
  const { review_id } = req.params;
  const Review = req.body;

  try {
    const response = await Review.findOneAndUpdate({ _id: review_id }, Review);
    res.status(200).json({ message: "Review updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_review = async (req, res, next) => {
  const { review_id } = req.params;
  
  try {
    const response = await Review.findOneAndDelete({ _id: review_id });
    return res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
