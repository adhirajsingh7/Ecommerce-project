const { mongoose, Schema } = require("mongoose");

const order_schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  destination: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  total_amount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["not_processed", "processing", "shipped", "delivered", "cancelled"],
    default: "not_processed",
  },
});

exports.Order = mongoose.model("Order", order_schema);
