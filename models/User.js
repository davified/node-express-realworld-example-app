const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "cannot be blank"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "cannot be blank"],
      index: true
    },
    bio: String,
    image: String,
    hash: String,
    salt: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
