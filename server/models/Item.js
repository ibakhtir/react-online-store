const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: String,
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    dough: String,
    price: Number,
    size: Number,
    weight: Number,
    calories: Number,
    rating: Number
  },
  {
    timestamps: true
  }
);

module.exports = model("Item", itemSchema);
