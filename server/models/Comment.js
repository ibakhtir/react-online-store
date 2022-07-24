const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isRecommend: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = model("Comment", commentSchema);
