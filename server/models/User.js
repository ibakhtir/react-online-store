const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    image: String
  },
  {
    timestamps: true
  }
);

module.exports = model("User", userSchema);
