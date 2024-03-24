const { mongoose, Schema } = require("mongoose");

const order_schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  // expected_delivery: {
  //   type: Date,
  //   required: true,
  // },
});

exports.Order = mongoose.model("Order", order_schema);
